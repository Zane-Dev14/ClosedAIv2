import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Check if API key is available
api_key = os.getenv("OPENAI_API_KEY")
if api_key:
    print(f"✅ OpenAI API key found: {api_key[:10]}...")
else:
    print("❌ OpenAI API key not found!")
    print("Please set OPENAI_API_KEY environment variable or create a .env file")
    
# Test LangChain imports
try:
    from langchain_community.embeddings import OpenAIEmbeddings
    from langchain_community.vectorstores import Chroma
    print("✅ LangChain imports successful")
except ImportError as e:
    print(f"❌ LangChain import error: {e}")
    print("Please install: pip install langchain-community langchain-openai")

# Test OpenAI client
try:
    import openai
    openai.api_key = api_key
    print("✅ OpenAI client initialized")
except Exception as e:
    print(f"❌ OpenAI client error: {e}") 