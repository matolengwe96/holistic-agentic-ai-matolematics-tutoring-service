import ChatWindow from '@/components/ChatWindow';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Matolematics | Socratic STEM Assistant</h1>
      <ChatWindow />
    </main>
  );
}