import { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useRecurring } from '../hooks/useRecurring';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import { AlertCircle, X } from 'lucide-react';

export default function Today() {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    injectRecurring, 
    checkCarryForward, 
    carryForward,
    todayStr 
  } = useTasks();
  
  const { getTasksForToday } = useRecurring();
  const [showCarryForward, setShowCarryForward] = useState(false);
  const [carryForwardCount, setCarryForwardCount] = useState(0);

  useEffect(() => {
    // Inject recurring tasks on load
    const recurringForToday = getTasksForToday();
    injectRecurring(recurringForToday);

    // Check for carry forward
    const incomplete = checkCarryForward();
    if (incomplete.length > 0) {
      setCarryForwardCount(incomplete.length);
      setShowCarryForward(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCarryForwardYes = () => {
    carryForward();
    setShowCarryForward(false);
  };

  const handleCarryForwardDismiss = () => {
    setShowCarryForward(false);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Format today's date for header
  const [year, month, day] = todayStr.split('-');
  const todayDateObj = new Date(year, month - 1, day);
  const formattedToday = todayDateObj.toLocaleDateString(undefined, { 
    weekday: 'long', month: 'long', day: 'numeric' 
  });

  return (
    <div className="max-w-xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {showCarryForward && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start space-x-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
          <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-amber-800">Incomplete tasks</h4>
            <p className="text-amber-700 text-sm mt-1">
              You have {carryForwardCount} incomplete task{carryForwardCount > 1 ? 's' : ''} from yesterday. Bring {carryForwardCount > 1 ? 'them' : 'it'} to today?
            </p>
            <div className="mt-3 flex space-x-3">
              <button 
                onClick={handleCarryForwardYes}
                className="backdrop-blur-md bg-amber-500/20 text-amber-900 border border-amber-500/30 shadow-[0_4px_16px_rgba(245,158,11,0.2)] hover:bg-amber-500/30 hover:scale-105 active:scale-95 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Yes, bring forward
              </button>
              <button 
                onClick={handleCarryForwardDismiss}
                className="text-amber-700 hover:bg-amber-500/10 hover:scale-105 active:scale-95 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button 
            onClick={handleCarryForwardDismiss}
            className="text-amber-400 hover:text-amber-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-semibold text-slate-700">Daily Progress</h3>
          <span className="text-sm font-bold text-indigo-600">
            {completedTasks} of {totalTasks} done
          </span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <TaskInput onAdd={addTask} />

      <div className="mt-8 space-y-1">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-50/50 border border-dashed border-slate-300 rounded-2xl">
            <p className="text-slate-500 font-medium">Your day is clear! Add a task above.</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          ))
        )}
      </div>

    </div>
  );
}
