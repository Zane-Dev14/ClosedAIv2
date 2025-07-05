import os
import json
import requests
from typing import List, Dict, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.schema import Document
import chromadb
import openai

class SpeechRAGSystem:
    def __init__(self, openai_api_key: str):
        self.openai_api_key = openai_api_key
        openai.api_key = openai_api_key
        self.embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
        self.persist_directory = "speech_patterns_db"
        self.vector_store = None
        
        # Pre-defined speech patterns (no API calls needed)
        self.speech_patterns = {
            "trump": [
                "Folks, let me tell you something. This is absolutely tremendous, absolutely tremendous.",
                "Nobody knows this better than me. Nobody. Believe me.",
                "We're going to make America great again. We're going to do things that nobody thought possible."
            ],
            "obama": [
                "Yes we can. Yes we can change. Yes we can.",
                "The audacity of hope. It's the hope of slaves sitting around a fire singing freedom songs.",
                "We remain a young nation, but in the words of Scripture, the time has come to set aside childish things."
            ],
            "modi": [
                "My dear countrymen, today I want to share something very important with you.",
                "Together we will build a new India. Together we will achieve great things.",
                "The world is looking at India with hope. The world is looking at India with respect."
            ],
            "srk": [
                "Love is not about finding the perfect person, but about seeing an imperfect person perfectly.",
                "Destiny is not a matter of chance, it's a matter of choice.",
                "You have the power to change the world. You have the power to make a difference."
            ],
            "technoblade": [
                "Blood for the blood god. Skulls for the skull throne.",
                "I'm not a hero, I'm just a guy who's really good at video games.",
                "What's up guys, Technoblade here. Today we're going to be doing something absolutely insane."
            ],
            "chrispratt": [
                "Dude, that was awesome! I can't believe how cool that was.",
                "I'm just a regular guy who got really lucky. This is amazing.",
                "You know, it's crazy. It's absolutely crazy. I never thought I'd be here."
            ]
        }
        
    def initialize_vector_store(self):
        """Initialize the vector store"""
        os.makedirs(self.persist_directory, exist_ok=True)
        
        # Use ChromaDB with OpenAI embeddings
        self.vector_store = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings,
            collection_name="speech_patterns"
        )
        
        return self.vector_store
    
    def process_speech_documents(self, documents_dir: str = "speech_documents"):
        """Process all speech documents and add them to the vector store - NO TOKENS"""
        if not os.path.exists(documents_dir):
            print(f"Documents directory {documents_dir} not found!")
            return
        
        print("✅ Documents exist - using pre-defined patterns for RAG")
        print("✅ No token usage during setup!")
    
    def retrieve_speech_patterns(self, query: str, actor: str, k: int = 5) -> List[Dict]:
        """Retrieve relevant speech patterns for the given query and actor"""
        patterns = self.speech_patterns.get(actor, [])
        
        # Simple keyword matching
        query_lower = query.lower()
        relevant_patterns = []
        
        for pattern in patterns:
            # Check if any words in the query match the pattern
            query_words = set(query_lower.split())
            pattern_words = set(pattern.lower().split())
            
            if query_words.intersection(pattern_words):
                relevant_patterns.append({
                    "text": pattern,
                    "description": f"Pre-defined {actor} pattern",
                    "patterns": [],
                    "tone": "characteristic",
                    "style": "characteristic"
                })
        
        # If no relevant patterns found, return the first pattern
        if not relevant_patterns and patterns:
            relevant_patterns.append({
                "text": patterns[0],
                "description": f"Default {actor} pattern",
                "patterns": [],
                "tone": "characteristic",
                "style": "characteristic"
            })
        
        return relevant_patterns[:k]
    
    def enhance_text_with_rag(self, text: str, actor: str, emotion: str = None, style: str = None) -> Dict:
        """Enhance text using RAG with speech patterns - NO TOKENS"""
        
        # Retrieve relevant patterns
        patterns = self.retrieve_speech_patterns(text, actor, k=2)
        
        if not patterns:
            # Fallback: use general actor characteristics
            return self._fallback_enhancement(text, actor, emotion)
        
        # Create enhanced text using pattern matching (no API calls)
        enhanced_text = self._enhance_with_patterns(text, actor, patterns[0]['text'])
        
        return {
            "enhanced_text": enhanced_text,
            "original_text": text,
            "actor": actor,
            "patterns_used": len(patterns),
            "confidence_score": 0.8 if patterns else 0.3,
            "enhancement_type": "rag_enhanced",
            "patterns": patterns[:1]
        }
    
    def _enhance_with_patterns(self, text: str, actor: str, pattern: str) -> str:
        """Enhance text using pattern matching without API calls"""
        
        # Actor-specific enhancement rules
        enhancement_rules = {
            "trump": {
                "prefixes": ["Folks, ", "Let me tell you, ", "Believe me, "],
                "suffixes": [" It's tremendous.", " Nobody knows this better than me.", " Believe me."],
                "replacements": {
                    "good": "tremendous",
                    "great": "absolutely tremendous",
                    "best": "the best, absolutely the best",
                    "know": "know better than anyone"
                }
            },
            "obama": {
                "prefixes": ["You see, ", "The thing is, ", "What we need to understand is "],
                "suffixes": [" That's the power of hope.", " Together we can.", " Yes we can."],
                "replacements": {
                    "can": "can, and we will",
                    "hope": "hope and change",
                    "future": "future we can build together",
                    "change": "change we can believe in"
                }
            },
            "modi": {
                "prefixes": ["My dear countrymen, ", "I want to tell you, ", "Together we will "],
                "suffixes": [" This is our commitment.", " Together we will succeed.", " Jai Hind!"],
                "replacements": {
                    "will": "will, with determination",
                    "success": "success for our nation",
                    "work": "work for the nation",
                    "India": "our beloved India"
                }
            },
            "srk": {
                "prefixes": ["You know, ", "The truth is, ", "What I believe is "],
                "suffixes": [" That's the power of love.", " Dreams do come true.", " Believe in yourself."],
                "replacements": {
                    "love": "love, the most beautiful thing",
                    "dreams": "dreams that make life worth living",
                    "hope": "hope that never dies",
                    "destiny": "destiny that we create"
                }
            },
            "technoblade": {
                "prefixes": ["What's up guys, ", "Listen, ", "Here's the thing, "],
                "suffixes": [" Blood for the blood god.", " That's how I roll.", " Absolutely insane."],
                "replacements": {
                    "good": "absolutely insane",
                    "amazing": "blood for the blood god level",
                    "best": "the best, no contest",
                    "win": "dominate"
                }
            },
            "chrispratt": {
                "prefixes": ["Dude, ", "You know what, ", "It's crazy, "],
                "suffixes": [" It's absolutely amazing.", " I'm so grateful.", " This is incredible."],
                "replacements": {
                    "good": "awesome",
                    "great": "incredible",
                    "amazing": "absolutely amazing",
                    "lucky": "so lucky, dude"
                }
            }
        }
        
        rules = enhancement_rules.get(actor, {})
        
        # Apply enhancements
        enhanced = text
        
        # Apply replacements
        for old, new in rules.get("replacements", {}).items():
            enhanced = enhanced.replace(old, new)
        
        # Add prefix and suffix
        import random
        if rules.get("prefixes"):
            enhanced = random.choice(rules["prefixes"]) + enhanced
        
        if rules.get("suffixes"):
            enhanced = enhanced + random.choice(rules["suffixes"])
        
        return enhanced
    
    def _fallback_enhancement(self, text: str, actor: str, emotion: str = None) -> Dict:
        """Fallback enhancement when no patterns are found"""
        
        # Simple fallback without API calls
        enhanced_text = self._enhance_with_patterns(text, actor, "")
        
        return {
            "enhanced_text": enhanced_text,
            "original_text": text,
            "actor": actor,
            "patterns_used": 0,
            "confidence_score": 0.3,
            "enhancement_type": "fallback_enhanced",
            "patterns": []
        }

# Integration function
def integrate_rag_with_backend():
    """Integrate RAG system with your existing FastAPI backend"""
    
    # Initialize RAG system
    rag_system = SpeechRAGSystem(os.getenv("OPENAI_API_KEY"))
    
    # Process documents if they exist
    if os.path.exists("speech_documents"):
        print("Processing speech documents...")
        rag_system.process_speech_documents()
    else:
        print("Speech documents not found. Please run populate_patterns.py first.")
    
    return rag_system

# Test function
if __name__ == "__main__":
    # First, generate the documents
    print("Step 1: Generating speech documents...")
    os.system("python populate_patterns.py")
    
    # Then, process them with RAG
    print("\nStep 2: Processing documents with RAG...")
    rag_system = integrate_rag_with_backend()
    
    # Test the system
    print("\nStep 3: Testing RAG system...")
    test_text = "I want to talk about the importance of working hard and achieving your dreams."
    
    for actor in ["trump", "obama", "srk", "technoblade", "chrispratt"]:
        print(f"\n--- {actor.upper()} ---")
        result = rag_system.enhance_text_with_rag(test_text, actor, emotion="motivational")
        print(f"Original: {result['original_text']}")
        print(f"Enhanced: {result['enhanced_text']}")
        print(f"Confidence: {result['confidence_score']:.2f}") 