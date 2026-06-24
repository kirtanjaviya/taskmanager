import { X } from 'lucide-react';
import clsx from 'clsx';

export default function DayDetail({ dateStr, tasks, onClose }) {
  if (!dateStr) return null;

  // Format date nicely
  const [year, month, day] = dateStr.split('-');
  const dateObj = new Date(year, month - 1, day);
  const formattedDate = dateObj.toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">{formattedDate}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {(!tasks || tasks.length === 0) ? (
            <div className="text-center py-8 text-slate-500">
              <p>No tasks recorded for this day.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map(task => (
                <li 
                  key={task.id} 
                  className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className={clsx(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    task.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300 bg-white"
                  )}>
                    {task.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <p className={clsx(
                      "text-sm font-medium",
                      task.completed ? "line-through text-slate-500" : "text-slate-800"
                    )}>
                      {task.title}
                    </p>
                    {task.type === 'recurring' && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-600 mt-1 inline-block">
                        Recurring
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
