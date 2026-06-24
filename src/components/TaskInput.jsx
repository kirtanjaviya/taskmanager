import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-500/80 to-purple-600/80 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(99,102,241,0.4)] text-white p-3 rounded-xl hover:from-indigo-400/90 hover:to-purple-500/90 hover:scale-105 hover:shadow-[0_8px_32px_rgba(99,102,241,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center min-w-[3rem]"
      >
        <Plus className="w-6 h-6" />
      </button>
    </form>
  );
}
