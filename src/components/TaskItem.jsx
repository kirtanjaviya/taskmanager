import { Check, Trash2 } from 'lucide-react';
import clsx from 'clsx';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={clsx(
      "group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-300 shadow-sm",
      task.completed 
        ? "bg-slate-50 border-slate-200 opacity-60" 
        : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
    )}>
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={() => onToggle(task.id)}
          className={clsx(
            "w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0",
            task.completed
              ? "bg-emerald-500 text-white"
              : "border-2 border-slate-300 hover:border-indigo-500 text-transparent hover:bg-indigo-50"
          )}
        >
          <Check className="w-4 h-4" />
        </button>
        <span className={clsx(
          "text-base font-medium transition-all duration-300",
          task.completed ? "line-through text-slate-500" : "text-slate-800"
        )}>
          {task.title}
        </span>
        {task.type === 'recurring' && (
          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold ml-2">
            Recurring
          </span>
        )}
      </div>
      
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        title="Delete Task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
