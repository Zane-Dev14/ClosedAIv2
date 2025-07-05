import os
import subprocess
import sys

def setup_rag_system():
    """Complete setup for RAG system"""
    
    print("🚀 Setting up RAG system...")
    
    # Step 1: Check environment
    print("\n1. Checking environment...")
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ OPENAI_API_KEY not found in environment!")
        print("Please set it in your .env file or environment variables")
        return False
    else:
        print(f"✅ OpenAI API key found: {api_key[:10]}...")
    
    # Step 2: Generate speech documents
    print("\n2. Generating speech documents...")
    try:
        subprocess.run([sys.executable, "populate_patterns.py"], check=True)
        print("✅ Speech documents generated successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error generating documents: {e}")
        return False
    
    # Step 3: Test RAG system
    print("\n3. Testing RAG system...")
    try:
        from rag_system import SpeechRAGSystem
        rag_system = SpeechRAGSystem(api_key)
        rag_system.process_speech_documents()
        print("✅ RAG system initialized successfully!")
    except Exception as e:
        print(f"❌ Error initializing RAG system: {e}")
        return False
    
    # Step 4: Test enhancement
    print("\n4. Testing text enhancement...")
    test_text = "I want to talk about the importance of working hard and achieving your dreams."
    
    try:
        result = rag_system.enhance_text_with_rag(test_text, "trump", emotion="motivational")
        print(f"✅ Enhancement test successful!")
        print(f"Original: {result['original_text']}")
        print(f"Enhanced: {result['enhanced_text']}")
        print(f"Confidence: {result['confidence_score']:.2f}")
    except Exception as e:
        print(f"❌ Error in enhancement test: {e}")
        return False
    
    print("\n🎉 RAG system setup complete! You can now run your server.")
    return True

if __name__ == "__main__":
    setup_rag_system() 