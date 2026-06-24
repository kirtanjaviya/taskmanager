import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

const DAYS = [
  { id: 'mon', label: 'M' },
  { id: 'tue', label: 'T' },
  { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' },
  { id: 'fri', label: 'F' },
  { id: 'sat', label: 'S' },
  { id: 'sun', label: 'S' },
];

export default function RecurringForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('daily');
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (dayId) => {
    setSelectedDays(prev => 
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (schedule === 'weekly' && selectedDays.length === 0) return;

    onAdd(title.trim(), schedule, selectedDays);
    setTitle('');
    setSchedule('daily');
    setSelectedDays([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">New Recurring Task</h3>
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="daily"
              checked={schedule === 'daily'}
              onChange={(e) => setSchedule(e.target.value)}
              className="text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">Daily</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="weekly"
              checked={schedule === 'weekly'}
              onChange={(e) => setSchedule(e.target.value)}
              className="text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">Weekly</span>
          </label>
        </div>

        {schedule === 'weekly' && (
          <div className="flex space-x-2 pt-2">
            {DAYS.map(day => (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleDay(day.id)}
                className={clsx(
                  "w-10 h-10 rounded-full font-semibold text-sm transition-all flex items-center justify-center",
                  selectedDays.includes(day.id)
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                )}
              >
                {day.label}
              </button>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!title.trim() || (schedule === 'weekly' && selectedDays.length === 0)}
          className="w-full relative overflow-hidden bg-gradient-to-br from-purple-500/80 to-pink-600/80 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(168,85,247,0.4)] text-white font-medium py-3 rounded-xl hover:from-purple-400/90 hover:to-pink-500/90 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(168,85,247,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Recurring Task
        </button>
      </div>
    </form>
  );
}
