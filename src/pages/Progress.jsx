import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import MonthGrid from '../components/MonthGrid';
import DayDetail from '../components/DayDetail';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Progress() {
  const { allTasks } = useTasks();
  
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const handleDayClick = (dateStr, tasks) => {
    setSelectedDateStr(dateStr);
    setSelectedTasks(tasks);
  };

  const closeDetail = () => {
    setSelectedDateStr(null);
    setSelectedTasks([]);
  };

  const monthName = new Date(year, month, 1).toLocaleDateString(undefined, { month: 'long' });

  return (
    <div className="max-w-xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">


      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button 
          onClick={handlePrevMonth}
          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-slate-800">
          {monthName} {year}
        </h3>
        <button 
          onClick={handleNextMonth}
          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <MonthGrid 
        year={year} 
        month={month} 
        allTasks={allTasks} 
        onDayClick={handleDayClick} 
      />

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-2 text-xs font-medium text-slate-500 bg-white py-3 px-4 rounded-xl border border-slate-200 shadow-sm inline-flex">
        <span>Less</span>
        <div className="w-4 h-4 rounded-sm bg-slate-100" />
        <div className="w-4 h-4 rounded-sm bg-emerald-100" />
        <div className="w-4 h-4 rounded-sm bg-emerald-300" />
        <div className="w-4 h-4 rounded-sm bg-emerald-500" />
        <div className="w-4 h-4 rounded-sm bg-emerald-800" />
        <span>More</span>
      </div>

      {selectedDateStr && (
        <DayDetail 
          dateStr={selectedDateStr} 
          tasks={selectedTasks} 
          onClose={closeDetail} 
        />
      )}
    </div>
  );
}
