from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
from minimal_tts_rvc.tts_rvc_cli import tts_rvc_pipeline, list_models, validate_models, test_tts_voice, MODELS

app = FastAPI(title="Minimal TTS + RVC API", description="Text-to-Speech and RVC voice conversion backend.")

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SynthesizeRequest(BaseModel):
    text: str
    model: str

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
        # Patch tts_rvc_pipeline to allow custom output path
        rvc_path = tts_rvc_pipeline(req.text, model_choice, output_dir=output_dir)
        # Rename to unique file for download
        os.rename(rvc_path, out_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Synthesis failed: {e}")
    
    # Return as file response
    return FileResponse(out_path, media_type="audio/mpeg", filename=os.path.basename(out_path))

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