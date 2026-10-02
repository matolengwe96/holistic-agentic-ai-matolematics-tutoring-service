from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import socratic

app = FastAPI(title="Matolematics Socratic AI Microservice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(socratic.router, prefix="/api/socratic", tags=["Socratic Engine"])

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "agents-socratic-ai"}