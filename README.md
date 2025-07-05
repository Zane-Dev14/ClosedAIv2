# ClosedAIv2

GenAI, TTS, Uses RVC, trained.

## Production Deployment

### Backend (FastAPI) on Render

1. **Procfile**: Already present in the root:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port 10000
   ```
2. **Environment Variables**: Add your `OPENAI_API_KEY` in the Render dashboard or in a `.env` file (not committed).
3. **requirements.txt**: All dependencies are listed for production.
4. **Push to GitHub**: Make sure all changes are pushed to your repo.
5. **Render Setup**:
   - New Web Service → Connect your repo
   - Root Directory: `/` (since backend and frontend are together)
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
   - Set environment variables as needed
   - Deploy!

### Frontend (React/Vite) on GitHub Pages

1. **Configured for GitHub Pages**: `frontend/package.json` and `vite.config.ts` are set up.
2. **Build and Deploy**:
   ```sh
   cd frontend
   npm run deploy
   ```
   Your site will be live at: `https://Zane-Dev14.github.io/ClosedAIv2/`
3. **API URL**: Set `VITE_API_BASE_URL` in `frontend/.env.production` to your Render backend URL (e.g., `https://your-backend.onrender.com/api`).

### Notes
- Both frontend and backend are in the same repo.
- Only the backend needs to be deployed to Render; the frontend is static and goes to GitHub Pages.
- All test/dev scripts and large files are ignored in production.

---

For more details, see the code and comments in this repo.
