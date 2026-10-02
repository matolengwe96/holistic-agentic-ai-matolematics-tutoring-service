from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    student_id: str = "guest"
    grade: str = "CAPS Grade 11"

@router.post("/chat")
async def chat_with_socratic_agent(payload: ChatRequest):
    # Simulated Socratic guidance step
    return {
        "response": f"Let's break down your question about '{payload.message}'. What is the first rule you apply to isolate x?",
        "sympy_verified": True,
        "katex_latex": "x^2 + 5x + 6 = 0"
    }