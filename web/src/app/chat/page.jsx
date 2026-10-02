'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Hello! I am your Matolematics Socratic AI assistant. What math or science concept are we exploring today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/socratic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, student_id: 'learner-001', grade: 'CAPS Grade 11' }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: data.response || 'Let us break this down step-by-step.' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'agent', text: 'Error connecting to the Socratic AI service. Please check your backend agent status.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-slate-950 text-slate-100 p-4 max-w-4xl mx-auto">
      <header className="py-4 border-b border-slate-800 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-400">Matolematics | Socratic STEM Assistant</h1>
          <p className="text-xs text-slate-400">CAPS & IEB Aligned Interactive Workspace</p>
        </div>
        <span className="px-3 py-1 bg-blue-950 text-blue-300 text-xs rounded-full border border-blue-800">
          FastAPI / SymPy Active
        </span>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={lex \}
          >
            <div
              className={max-w-lg p-3 rounded-lg text-sm \}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg text-xs bg-slate-800 text-slate-400 animate-pulse">
              Socratic Agent is analyzing symbolic step...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or enter an algebraic step..."
          className="flex-1 bg-slate-900 border border-slate-800 text-slate-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Send
        </button>
      </form>
    </main>
  );
}
