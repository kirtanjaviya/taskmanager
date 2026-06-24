import { getMonthGrid } from '../utils/dateUtils';
import clsx from 'clsx';

export default function MonthGrid({ year, month, allTasks, onDayClick }) {
  const days = getMonthGrid(year, month);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper to determine color based on completion percentage
  const getColorClass = (completedCount, totalCount) => {
    if (totalCount === 0) return 'bg-slate-100 hover:bg-slate-200';
    const percentage = completedCount / totalCount;
    
    if (percentage === 0) return 'bg-emerald-100 hover:bg-emerald-200'; // >0 tasks but 0%
    if (percentage < 0.5) return 'bg-emerald-300 hover:bg-emerald-400';
    if (percentage < 0.75) return 'bg-emerald-500 hover:bg-emerald-600 text-emerald-50';
    if (percentage < 1) return 'bg-emerald-600 hover:bg-emerald-700 text-emerald-50';
    return 'bg-emerald-800 hover:bg-emerald-900 text-emerald-50'; // 100%
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map(wd => (
          <div key={wd} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-2">
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((dateStr, idx) => {
          if (!dateStr) {
            return <div key={`empty-${idx}`} className="aspect-square rounded-xl bg-transparent" />;
          }

          const dayNumber = parseInt(dateStr.split('-')[2], 10);
          const tasksForDay = allTasks[dateStr] || [];
          const totalTasks = tasksForDay.length;
          const completedTasks = tasksForDay.filter(t => t.completed).length;
          
          const colorClass = getColorClass(completedTasks, totalTasks);

          return (
            <button
              key={dateStr}
              onClick={() => onDayClick(dateStr, tasksForDay)}
              className={clsx(
                "relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200",
                colorClass
              )}
              title={`${dateStr}: ${completedTasks}/${totalTasks} tasks completed`}
            >
              <span className="text-sm font-medium">{dayNumber}</span>
              {totalTasks > 0 && (
                <span className="text-[10px] mt-0.5 opacity-80 font-medium">
                  {completedTasks}/{totalTasks}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
