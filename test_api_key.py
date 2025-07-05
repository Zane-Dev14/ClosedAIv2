import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv("OPENAI_API_KEY")
print(f"API Key found: {api_key[:10]}..." if api_key else "No API key found!")

if api_key:
    # Test the API key with new format
    client = OpenAI(api_key=api_key)
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "Say hello"}
            ],
            max_tokens=10
        )
        print("✅ API key works!")
        print(f"Response: {response.choices[0].message.content}")
    except Exception as e:
        print(f"❌ API key error: {e}")
else:
    print("Please set OPENAI_API_KEY in your .env file") 