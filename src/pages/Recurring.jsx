import { useRecurring } from '../hooks/useRecurring';
import RecurringForm from '../components/RecurringForm';
import { Trash2, Play, Pause } from 'lucide-react';
import clsx from 'clsx';

export default function Recurring() {
  const { recurringTasks, addRecurring, toggleActive, deleteRecurring } = useRecurring();

  const getScheduleText = (task) => {
    if (task.schedule === 'daily') return 'Daily';
    
    const dayMap = {
      mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun'
    };
    return task.days.map(d => dayMap[d]).join(', ');
  };

  return (
    <div className="max-w-xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <RecurringForm onAdd={addRecurring} />

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Your Routines
        </h3>
        
        {recurringTasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-50/50 border border-dashed border-slate-300 rounded-2xl">
            <p className="text-slate-500 font-medium">No recurring tasks yet. Create one above!</p>
          </div>
        ) : (
          recurringTasks.map(task => (
            <div 
              key={task.id}
              className={clsx(
                "group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 shadow-sm",
                task.active 
                  ? "bg-white border-slate-200 hover:border-purple-300 hover:shadow-md"
                  : "bg-slate-50 border-slate-200 opacity-60 grayscale-[0.2]"
              )}
            >
              <div className="flex-1">
                <h4 className={clsx(
                  "font-semibold text-lg transition-colors",
                  task.active ? "text-slate-800" : "text-slate-500"
                )}>
                  {task.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  {getScheduleText(task)}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(task.id)}
                  className={clsx(
                    "flex items-center justify-center p-2 rounded-lg font-medium text-sm transition-all border",
                    task.active
                      ? "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                  )}
                  title={task.active ? "Pause" : "Resume"}
                >
                  {task.active ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5" />}
                  {task.active ? 'Active' : 'Paused'}
                </button>
                
                <button
                  onClick={() => deleteRecurring(task.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Routine"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
