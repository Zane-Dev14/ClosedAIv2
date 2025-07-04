import os
import sys
import asyncio
import edge_tts
from minimal_tts_rvc.infer import VoiceConverter

# Get the directory where this file is located and construct absolute paths
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)  # Go up one level to project root
models_dir = os.path.join(project_root, "models")

MODELS = {
    "obama": {
        "pth": os.path.join(models_dir, "obama.pth"),
        "index": os.path.join(models_dir, "obama.index"),
        "voice": "en-US-GuyNeural",  # US English, male, neutral, fits Obama
        "desc": "Barack Obama (US President, calm, authoritative, American accent)"
    },
    "srk": {
        "pth": os.path.join(models_dir, "srk.pth"),
        "index": os.path.join(models_dir, "srk.index"),
        "voice": "en-IN-PrabhatNeural",  # Indian English, male, fits SRK
        "desc": "Shah Rukh Khan (Bollywood actor, charismatic, Indian accent)"
    },
    "modi": {
        "pth": os.path.join(models_dir, "modi.pth"),
        "index": os.path.join(models_dir, "modi.index"),
        "voice": "en-IN-PrabhatNeural",  # Indian English, male, conversational, fits Modi
        "desc": "Narendra Modi (Indian PM, assertive, Indian accent)"
    },
    "trump": {
        "pth": os.path.join(models_dir, "trump.pth"),
        "index": os.path.join(models_dir, "trump.index"),
        "voice": "en-US-GuyNeural",  # Using the same reliable voice as Obama for Trump
        "desc": "Donald Trump (US President, energetic, American accent)"
    },
    "Hutao": {
        "pth": os.path.join(models_dir, "Hutao.pth"),
        "index": os.path.join(models_dir, "Hutao.index"),
        "voice": "ja-JP-NanamiNeural",  # Japanese, female, youthful, fits Hu Tao (Genshin Impact)
        "desc": "Hu Tao (Genshin Impact, female, playful, Japanese accent)"
    },
    "technoblade": {
        "pth": os.path.join(models_dir, "technoblade.pth"),
        "index": os.path.join(models_dir, "technoblade.index"),
        "voice": "en-US-AndrewNeural",  # US English, male, warm, fits Technoblade (American Minecraft YouTuber)
        "desc": "Technoblade (Minecraft YouTuber, witty, American accent)"
    },
    "ChrisPratt": {
        "pth": os.path.join(models_dir, "ChrisPratt.pth"),
        "index": None,
        "voice": "en-US-BrianNeural",  # US English, male, friendly, fits Chris Pratt
        "desc": "Chris Pratt (Hollywood actor, friendly, American accent)"
    }
}

def synthesize_tts(text, voice, tts_wav):
    async def run_tts():
        try:
            # Add a small delay to avoid rate limiting
            await asyncio.sleep(0.1)
            communicate = edge_tts.Communicate(text, voice)
            await communicate.save(tts_wav)
            print(f"[SUCCESS] TTS file saved to: {tts_wav}")
        except Exception as e:
            print(f"[ERROR] TTS synthesis failed for voice '{voice}': {e}")
            # Try with a fallback voice if the original fails
            fallback_voice = "en-US-GuyNeural"
            if voice != fallback_voice:
                print(f"[INFO] Trying fallback voice: {fallback_voice}")
                try:
                    communicate = edge_tts.Communicate(text, fallback_voice)
                    await communicate.save(tts_wav)
                    print(f"[SUCCESS] TTS file saved with fallback voice: {tts_wav}")
                except Exception as e2:
                    print(f"[ERROR] Fallback voice also failed: {e2}")
                    raise e2
            else:
                raise e
    asyncio.run(run_tts())

def tts_rvc_pipeline(text, model_choice, output_dir="output"):
    try:
        os.makedirs(output_dir, exist_ok=True)
        model = MODELS[model_choice]
        tts_wav = os.path.join(output_dir, f"{model_choice}_tts.wav")
        rvc_wav = os.path.join(output_dir, f"{model_choice}_rvc.mp3")
        
        # Check if model files exist
        if not os.path.exists(model["pth"]):
            raise FileNotFoundError(f"Model file not found: {model['pth']}")
        if model["index"] and not os.path.exists(model["index"]):
            raise FileNotFoundError(f"Index file not found: {model['index']}")
        
        print(f"[INFO] Synthesizing TTS with voice: {model['voice']} ({model['desc']})...")
        synthesize_tts(text, model["voice"], tts_wav)
        
        # Check if TTS file was created
        if not os.path.exists(tts_wav):
            raise FileNotFoundError(f"TTS file was not created: {tts_wav}")
        
        print(f"[INFO] Running RVC voice conversion with model: {model['pth']} and index: {model['index']}...")
        vc = VoiceConverter()
        vc.convert_audio(
            audio_input_path=tts_wav,
            audio_output_path=rvc_wav,
            model_path=model["pth"],
            index_path=model["index"],
            embedder_model="contentvec",
            f0_method="rmvpe",
            export_format="MP3",
            sid=0,
            pitch=-8,
            clean_audio=True,
            clean_strength=0.5,
            volume_envelope=1.0,
            hop_length=128,
            protect=0.8,
        )
        
        # Check if RVC file was created
        if not os.path.exists(rvc_wav):
            raise FileNotFoundError(f"RVC file was not created: {rvc_wav}")
        
        print(f"[SUCCESS] Output written to {rvc_wav}")
        return rvc_wav
        
    except Exception as e:
        print(f"[ERROR] Pipeline failed: {e}")
        raise e

def list_models():
    """Return available models for API"""
    return MODELS

def validate_models():
    """Validate that all model files exist and return status"""
    validation_results = {}
    for name, model in MODELS.items():
        status = {
            "pth_exists": os.path.exists(model["pth"]),
            "index_exists": model["index"] is None or os.path.exists(model["index"]),
            "pth_path": model["pth"],
            "index_path": model["index"],
            "voice": model["voice"]
        }
        validation_results[name] = status
    return validation_results

async def test_tts_voice(voice, test_text="Hello"):
    """Test if a TTS voice works"""
    try:
        communicate = edge_tts.Communicate(test_text, voice)
        # Just test if we can create the communicate object
        return True
    except Exception as e:
        print(f"[WARNING] Voice '{voice}' test failed: {e}")
        return False

def main():
    print("=== Minimal TTS + RVC CLI ===")
    text = input("Enter the text to synthesize: ").strip()
    print("Choose a model:")
    for i, (k, v) in enumerate(MODELS.items(), 1):
        print(f"  {i}. {v['desc']} [{k}]")
    
    model_choice = None
    valid_choices = {str(i): k for i, k in enumerate(MODELS.keys(), 1)}
    valid_choices.update({k: k for k in MODELS.keys()})
    
    while model_choice not in valid_choices:
        model_choice = input(f"Enter model name or number: ").strip()
        model_choice = valid_choices.get(model_choice, model_choice)
    
    try:
        tts_rvc_pipeline(text, model_choice)
    except Exception as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 