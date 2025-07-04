# Minimal TTS + RVC FastAPI

A FastAPI backend for Text-to-Speech and RVC (Retrieval-Based Voice Conversion) voice synthesis.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Make sure your models are in the correct location:
   - Models should be in the `models/` directory
   - Each model should have a `.pth` file and optionally an `.index` file

## Running the API

### Simple way (recommended)
```bash
python main.py
```

### Alternative: Using uvicorn directly
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### GET /
Home page with basic information and links.

### GET /health
Health check endpoint.
```json
{
  "status": "ok"
}
```

### GET /models
List all available voice models.
```json
{
  "models": {
    "obama": {
      "pth": "../models/obama.pth",
      "index": "../models/obama.index",
      "voice": "en-US-GuyNeural",
      "desc": "Barack Obama (US President, calm, authoritative, American accent)"
    },
    ...
  }
}
```

### POST /synthesize
Synthesize speech with the specified model and text.

**Request Body:**
```json
{
  "text": "Hello, this is a test message!",
  "model": "obama"
}
```

**Response:**
- Returns an MP3 audio file for download
- Content-Type: `audio/mpeg`
- Filename: `{model}_{unique_id}_rvc.mp3`

## Available Models

- **obama**: Barack Obama (US President, calm, authoritative, American accent)
- **srk**: Shah Rukh Khan (Bollywood actor, charismatic, Indian accent)
- **modi**: Narendra Modi (Indian PM, assertive, Indian accent)
- **trump**: Donald Trump (US President, energetic, American accent)
- **Hutao**: Hu Tao (Genshin Impact, female, playful, Japanese accent)
- **technoblade**: Technoblade (Minecraft YouTuber, witty, American accent)
- **ChrisPratt**: Chris Pratt (Hollywood actor, friendly, American accent)

## Testing

Run the test script to verify the API is working:
```bash
python test_api.py
```

## Example Usage

### Using curl
```bash
# List models
curl http://localhost:8000/models

# Synthesize speech
curl -X POST http://localhost:8000/synthesize \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world!", "model": "obama"}' \
  --output output.mp3
```

### Using Python requests
```python
import requests

# List models
response = requests.get("http://localhost:8000/models")
models = response.json()

# Synthesize speech
data = {
    "text": "Hello world!",
    "model": "obama"
}
response = requests.post("http://localhost:8000/synthesize", json=data)

# Save the audio file
with open("output.mp3", "wb") as f:
    f.write(response.content)
```

## Notes

- The API generates unique filenames for each request to avoid conflicts
- Audio files are temporarily stored in the `output/` directory
- The API supports CORS for frontend development
- All models use the same RVC parameters (pitch=-8, clean_audio=True, etc.)
- The ChrisPratt model doesn't use an index file (index=None) 