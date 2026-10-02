'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function ChatWindow({ studentId = "std_001", subject = "MATHEMATICS" }) {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Molo! Welcome to Matolematics Tutoring Services. What math topic or question are we working on today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('xh');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { 
      sender: 'student', 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          message: currentInput,
          subject: subject,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(HTTP error! status: );
      }

      const data = await response.json();
      
      const agentMessage = {
        sender: 'agent',
        text: data.socratic_response || 'I was unable to evaluate that step. Let us try breaking it down again.',
        mathVerified: data.math_verified || false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('[Chat Component Error]:', error);
      setMessages((prev) => [
        ...prev, 
        { 
          sender: 'agent', 
          text: 'Encountered a connection issue with the server. Please check if services are running.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] w-full max-w-2xl border border-slate-800 rounded-xl bg-slate-900 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h2 className="font-bold text-base text-white tracking-wide">Matolematics AI Tutor</h2>
            <p className="text-xs text-slate-400">{subject} • Socratic Mode</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-400">Language:</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="xh">isiXhosa</option>
            <option value="en">English</option>
            <option value="zu">isiZulu</option>
            <option value="af">Afrikaans</option>
          </select>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={lex flex-col max-w-[85%] }
          >
            <div
              className={p-4 rounded-2xl text-sm leading-relaxed }
            >
              <p>{msg.text}</p>
              {msg.mathVerified && (
                <div className="mt-2 text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
                  <span>?</span> SymPy Logic Verified
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col max-w-[85%] mr-auto items-start">
            <div className="p-4 rounded-2xl rounded-bl-none bg-slate-800/50 border border-slate-800 text-slate-400 text-sm flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span>Analyzing mathematical logic...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-4 border-t border-slate-800 bg-slate-900/50 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer or working step (e.g., x^2 - 5x + 6 = 0)..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-sm rounded-xl transition shadow-lg focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}
