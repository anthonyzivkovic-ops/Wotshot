from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Wotshot API")

# Enable CORS so your frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you can replace this with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class IntelligencePacket(BaseModel):
    id: Optional[str] = None
    category: str
    subcategory: Optional[str] = None
    title: str
    summary_bullets: List[str]
    source: Optional[str] = "Unknown"
    link: Optional[str] = None
    timestamp: Optional[str] = None

# Mock Data (Replace with your database or scraper fetching logic later)
MOCK_PACKETS = [
    {
        "id": "1",
        "category": "Technology",
        "subcategory": "Artificial Intelligence",
        "title": "Next-Gen LLMs Introduce Native Multimodal Processing",
        "summary_bullets": [
            "New architectures process live video feeds and speech natively without external transcription tools.",
            "Token efficiency has improved by 40%, reducing operational inference costs significantly.",
            "Context windows expand up to 2 million tokens across major cloud deployment endpoints."
        ],
        "source": "TechCrunch",
        "link": "https://techcrunch.com",
        "timestamp": "Just Now"
    },
    {
        "id": "2",
        "category": "Business",
        "subcategory": "Global Markets",
        "title": "Industrial Supply Chains Shift Toward Nearshoring Initiatives",
        "summary_bullets": [
            "Manufacturing firms increase capital allocation for regional logistics infrastructure.",
            "Automation integration balances higher local labor expenses across automated facilities."
        ],
        "source": "Wall Street Journal",
        "link": "https://wsj.com",
        "timestamp": "10m ago"
    }
]

MOCK_TRENDS = [
    "MultimodalAI",
    "Nearshoring",
    "GreenHydrogen",
    "SaaSValuations"
]

@app.get("/")
def read_root():
    return {"status": "online", "message": "Welcome to the Wotshot API"}

@app.get("/api/packets", response_model=List[IntelligencePacket])
def get_packets():
    return MOCK_PACKETS

@app.get("/api/trends", response_model=List[str])
def get_trends():
    return MOCK_TRENDS
