from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
import openai
from typing import List, Dict, Optional
import json
from minimal_tts_rvc.tts_rvc_cli import tts_rvc_pipeline, list_models, validate_models, test_tts_voice, MODELS

# Load environment variables first
from dotenv import load_dotenv
load_dotenv()

# Fix deprecated imports - use the new langchain-openai package
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma  # Fixed import
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
import chromadb

# Import the RAG system
from rag_system import SpeechRAGSystem

app = FastAPI(title="Minimal TTS + RVC API with RAG", description="Text-to-Speech and RVC voice conversion backend with RAG capabilities.")

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize vector store with proper API key
embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
vector_store = None

# Replace the existing RAG functions with the new system
rag_system = None

class SynthesizeRequest(BaseModel):
    text: str
    model: str
    use_rag: bool = True
    context_window: int = 3

class SpeechPatternRequest(BaseModel):
    text: str
    description: str
    model: str

class RAGResponse(BaseModel):
    enhanced_text: str
    retrieved_patterns: List[Dict]
    confidence_score: float

def analyze_speech_patterns(text: str) -> Dict:
    """Use OpenAI to analyze speech patterns in text - optimized for tokens"""
    try:
        # Shorter, more focused prompt
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Analyze speech patterns. Return JSON: {\"tone\": \"\", \"style\": \"\", \"key_phrases\": []}"},
                {"role": "user", "content": f"Text: {text[:200]}"}  # Limit input length
            ],
            temperature=0.1,
            max_tokens=100  # Limit output tokens
        )
        
        analysis = json.loads(response.choices[0].message.content)
        return analysis
    except Exception as e:
        print(f"Error analyzing speech patterns: {e}")
        return {"tone": "neutral", "style": "formal", "key_phrases": []}

def initialize_vector_store():
    """Initialize the vector store for speech patterns"""
    global vector_store
    
    # Create persistent directory
    persist_directory = "speech_patterns_db"
    os.makedirs(persist_directory, exist_ok=True)
    
    # Initialize ChromaDB
    vector_store = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings,
        collection_name="speech_patterns"
    )
    
    return vector_store

def add_speech_pattern(text: str, description: str, model: str):
    """Add a speech pattern to the vector store"""
    global vector_store
    
    if vector_store is None:
        vector_store = initialize_vector_store()
    
    # Analyze speech patterns
    analysis = analyze_speech_patterns(text)
    
    # Create document
    pattern_doc = Document(
        page_content=f"Text: {text}\nDescription: {description}\nModel: {model}\nAnalysis: {json.dumps(analysis)}",
        metadata={
            "text": text,
            "description": description,
            "model": model,
            "patterns": analysis.get("patterns", []),
            "tone": analysis.get("tone", "neutral"),
            "style": analysis.get("style", "formal")
        }
    )
    
    # Add to vector store
    vector_store.add_documents([pattern_doc])
    vector_store.persist()
    
    return {"status": "success", "analysis": analysis}

def retrieve_relevant_patterns(query: str, model: str, k: int = 3) -> List[Dict]:
    """Retrieve relevant speech patterns for the given query and model"""
    global vector_store
    
    if vector_store is None:
        return []
    
    # Search for relevant patterns
    results = vector_store.similarity_search(
        f"speech pattern for: {query}",
        k=k,
        filter={"model": model}
    )
    
    return [
        {
            "text": doc.metadata.get("text", ""),
            "description": doc.metadata.get("description", ""),
            "patterns": doc.metadata.get("patterns", []),
            "tone": doc.metadata.get("tone", "neutral"),
            "style": doc.metadata.get("style", "formal")
        }
        for doc in results
    ]

def initialize_rag_system():
    """Initialize the RAG system"""
    global rag_system
    if rag_system is None:
        rag_system = SpeechRAGSystem(os.getenv("OPENAI_API_KEY"))
        # Process documents if they exist
        if os.path.exists("speech_documents"):
            print("Processing speech documents with RAG...")
            rag_system.process_speech_documents()
        else:
            print("Speech documents not found. Using fallback patterns.")
    return rag_system

def enhance_text_with_advanced_rag(text: str, model: str, emotion: str = None, context_window: int = 3) -> RAGResponse:
    """Enhanced RAG with the new system"""
    global rag_system
    
    if rag_system is None:
        rag_system = initialize_rag_system()
    
    # Map model names to actor names
    model_to_actor = {
        "trump": "trump",
        "obama": "obama", 
        "modi": "modi",
        "srk": "srk",
        "technoblade": "technoblade",
        "chrispratt": "chrispratt"
    }
    
    actor = model_to_actor.get(model, model)
    
    # Use the RAG system
    result = rag_system.enhance_text_with_rag(text, actor, emotion)
    
    return RAGResponse(
        enhanced_text=result["enhanced_text"],
        retrieved_patterns=result["patterns"],
        confidence_score=result["confidence_score"]
    )

@app.get("/", response_class=HTMLResponse)
def home():
    return """
    <h1>Minimal TTS + RVC API</h1>
    <p>Use <a href='/docs'>/docs</a> for Swagger UI.</p>
    <ul>
      <li>GET /models - List available models</li>
      <li>GET /validate - Validate model files exist</li>
      <li>POST /synthesize - Synthesize speech (see docs)</li>
      <li>GET /health - Health check</li>
    </ul>
    """

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/models")
def get_models():
    models = list_models()
    return {"models": models}

@app.get("/validate")
async def validate():
    """Validate that all model files exist and TTS voices work"""
    validation = validate_models()
    
    # Test TTS voices
    voice_tests = {}
    for name, model in MODELS.items():
        voice_works = await test_tts_voice(model["voice"])
        voice_tests[name] = voice_works
    
    return {
        "validation": validation,
        "voice_tests": voice_tests
    }

@app.post("/patterns/add")
def add_pattern(req: SpeechPatternRequest):
    """Add a speech pattern to the database"""
    try:
        result = add_speech_pattern(req.text, req.description, req.model)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add pattern: {e}")

@app.get("/patterns/search")
def search_patterns(query: str, model: str, k: int = 3):
    """Search for relevant speech patterns"""
    try:
        patterns = retrieve_relevant_patterns(query, model, k)
        return {"patterns": patterns}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")

@app.get("/audio/{filename}")
def get_audio_file(filename: str):
    """Serve audio files"""
    file_path = os.path.join("output", filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    return FileResponse(
        file_path,
        media_type="audio/mpeg",
        filename=filename
    )

@app.post("/synthesize")
def synthesize(req: SynthesizeRequest):
    if req.model not in MODELS:
        raise HTTPException(status_code=400, detail=f"Model '{req.model}' not found.")
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text must not be empty.")
    
    # Generate unique output file per request
    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)
    unique_id = uuid.uuid4().hex[:8]
    model_choice = req.model
    out_path = os.path.join(output_dir, f"{model_choice}_{unique_id}_rvc.mp3")
    
    try:
        # Apply enhanced RAG if requested
        if req.use_rag:
            rag_result = enhance_text_with_advanced_rag(req.text, model_choice, req.context_window)
            text_to_synthesize = rag_result.enhanced_text
            print(f"RAG enhanced text: {text_to_synthesize}")
            print(f"Confidence: {rag_result.confidence_score}")
        else:
            text_to_synthesize = req.text
        
        # Generate speech
        rvc_path = tts_rvc_pipeline(text_to_synthesize, model_choice, output_dir=output_dir)
        os.rename(rvc_path, out_path)
        
        # Return enhanced response
        response_data = {
            "file_path": out_path,
            "original_text": req.text,
            "synthesized_text": text_to_synthesize,
            "model": model_choice
        }
        
        if req.use_rag:
            response_data["rag_info"] = {
                "enhanced": True,
                "confidence": rag_result.confidence_score,
                "patterns_used": len(rag_result.retrieved_patterns)
            }
        
        # Return JSON response with file URL
        response_data.update({
            "audio_url": f"/audio/{os.path.basename(out_path)}",
            "duration": 0,  # You can calculate this if needed
            "status": "success"
        })
        
        return JSONResponse(content=response_data)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Synthesis failed: {e}")

# Update the startup event
@app.on_event("startup")
async def startup_event():
    print("Initializing RAG system...")
    initialize_rag_system()
    print("RAG system initialized successfully!")

if __name__ == "__main__":
    import uvicorn
    print("Starting Minimal TTS + RVC API server...")
    print("API will be available at: http://localhost:8000")
    print("Swagger UI will be available at: http://localhost:8000/docs")
    print("Press Ctrl+C to stop the server")
    
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000,
        reload=True,  # Enable auto-reload for development
        log_level="info"
    ) 