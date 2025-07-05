# ClosedAIv2 - AI Voice Synthesis Studio

A full-stack AI voice synthesis application with RAG (Retrieval-Augmented Generation) capabilities, featuring celebrity voice cloning using TTS and RVC technology.

## 🚀 Live Demo

- **Frontend**: [https://Zane-Dev14.github.io/ClosedAIv2/](https://Zane-Dev14.github.io/ClosedAIv2/)
- **Backend API**: [https://closedaiv2.onrender.com](https://closedaiv2.onrender.com) (after deployment)

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + Python + OpenAI + ChromaDB
- **AI Models**: Edge TTS + RVC (Realistic Voice Cloning)
- **RAG System**: OpenAI + ChromaDB for speech pattern enhancement

## 🎯 Features

- **Voice Cloning**: Transform text into celebrity voices (Obama, Trump, Modi, SRK, etc.)
- **RAG Enhancement**: AI-powered text enhancement using speech patterns
- **Real-time Synthesis**: Fast voice generation with progress tracking
- **Modern UI**: Beautiful, responsive interface with 3D animations
- **Production Ready**: Optimized for deployment on GitHub Pages and Render

## 🚀 Deployment

### Frontend (GitHub Pages)
The frontend is automatically deployed to GitHub Pages:
```bash
cd frontend
npm run deploy
```

### Backend (Render)
1. Fork this repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Set environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
6. Deploy!

## 🛠️ Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- OpenAI API Key

### Backend Setup
```bash
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your OpenAI API key
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure
```
ClosedAIv2/
├── frontend/          # React frontend
├── minimal_tts_rvc/   # TTS and RVC models
├── models/            # Voice models (gitignored)
├── output/            # Generated audio (gitignored)
├── speech_documents/  # RAG training data
├── speech_patterns_db/ # ChromaDB vector store
├── main.py           # FastAPI backend
├── rag_system.py     # RAG implementation
└── requirements.txt  # Python dependencies
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=10000
ENVIRONMENT=production
```

## 📝 API Endpoints

- `GET /` - API documentation
- `GET /models` - List available voice models
- `GET /validate` - Validate system setup
- `POST /synthesize` - Generate voice synthesis
- `GET /audio/{filename}` - Serve generated audio files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Edge TTS for text-to-speech
- RVC for voice cloning
- OpenAI for RAG capabilities
- ChromaDB for vector storage
