import os
import requests
import json

def test_rag_system():
    """Test the complete RAG system"""
    
    # First, generate documents
    print("1. Generating speech documents...")
    os.system("python populate_patterns.py")
    
    # Start the server (in background)
    print("2. Starting server...")
    # You'll need to start the server manually: python main.py
    
    # Test the API
    base_url = "http://localhost:8000"
    
    test_cases = [
        {
            "text": "I want to talk about the importance of working hard and achieving your dreams.",
            "model": "trump",
            "use_rag": True
        },
        {
            "text": "We need to come together as a community and support each other.",
            "model": "obama", 
            "use_rag": True
        },
        {
            "text": "Love is the most important thing in life.",
            "model": "srk",
            "use_rag": True
        },
        {
            "text": "This game is absolutely insane!",
            "model": "technoblade",
            "use_rag": True
        },
        {
            "text": "I'm so grateful for this opportunity.",
            "model": "chrispratt",
            "use_rag": True
        }
    ]
    
    print("3. Testing RAG enhancement...")
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n--- Test {i}: {test_case['model']} ---")
        print(f"Original: {test_case['text']}")
        
        try:
            response = requests.post(
                f"{base_url}/synthesize",
                json=test_case,
                timeout=30
            )
            
            if response.status_code == 200:
                # Get RAG info from headers
                rag_info = response.headers.get("X-RAG-Info")
                if rag_info:
                    rag_data = json.loads(rag_info)
                    print(f"Enhanced: {rag_data.get('synthesized_text', 'N/A')}")
                    print(f"Confidence: {rag_data.get('rag_info', {}).get('confidence', 'N/A')}")
                else:
                    print("✓ Synthesis successful (no RAG info)")
            else:
                print(f"✗ Failed: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"✗ Error: {e}")

if __name__ == "__main__":
    test_rag_system() 