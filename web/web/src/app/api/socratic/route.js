import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const AGENTS_SERVICE_URL = process.env.AGENTS_SERVICE_URL || 'http://localhost:8000';

    const response = await fetch(\/api/socratic/chat, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to communicate with Socratic AI service' }, { status: 500 });
  }
}