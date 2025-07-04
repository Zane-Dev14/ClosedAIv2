#!/usr/bin/env python3
"""
Test script for the Minimal TTS + RVC FastAPI server
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test the health endpoint"""
    print("Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_models():
    """Test the models endpoint"""
    print("Testing models endpoint...")
    response = requests.get(f"{BASE_URL}/models")
    print(f"Status: {response.status_code}")
    models = response.json()
    print("Available models:")
    for name, details in models["models"].items():
        print(f"  - {name}: {details['desc']}")
    print()

def test_synthesize():
    """Test the synthesize endpoint"""
    print("Testing synthesize endpoint...")
    
    # Test data
    test_data = {
        "text": "Hello, this is a test of the TTS and RVC API!",
        "model": "obama"
    }
    
    print(f"Requesting synthesis with: {test_data}")
    response = requests.post(f"{BASE_URL}/synthesize", json=test_data)
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        # Save the audio file
        filename = f"test_output_{test_data['model']}.mp3"
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"Audio saved to: {filename}")
    else:
        print(f"Error: {response.text}")
    print()

if __name__ == "__main__":
    print("=== Testing Minimal TTS + RVC API ===\n")
    
    try:
        test_health()
        test_models()
        test_synthesize()
        print("All tests completed!")
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API server.")
        print("Make sure the server is running with: python main.py")
    except Exception as e:
        print(f"Error during testing: {e}") 