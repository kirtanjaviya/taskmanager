import { useState, useEffect } from 'react';
import { getTodayStr, getYesterdayStr } from '../utils/dateUtils';

const STORAGE_KEY = 'tasks';

export function useTasks() {
  const [allTasks, setAllTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const todayStr = getTodayStr();
  const tasks = allTasks[todayStr] || [];

  const saveTasks = (newAllTasks) => {
    setAllTasks(newAllTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAllTasks));
  };

  const addTask = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      type: 'one-time'
    };
    const newAllTasks = { ...allTasks };
    if (!newAllTasks[todayStr]) newAllTasks[todayStr] = [];
    newAllTasks[todayStr] = [...newAllTasks[todayStr], newTask];
    saveTasks(newAllTasks);
  };

  const toggleTask = (id, dateStr = todayStr) => {
    const newAllTasks = { ...allTasks };
    if (newAllTasks[dateStr]) {
      newAllTasks[dateStr] = newAllTasks[dateStr].map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveTasks(newAllTasks);
    }
  };

  const deleteTask = (id, dateStr = todayStr) => {
    const newAllTasks = { ...allTasks };
    if (newAllTasks[dateStr]) {
      newAllTasks[dateStr] = newAllTasks[dateStr].filter(t => t.id !== id);
      saveTasks(newAllTasks);
    }
  };

  const injectRecurring = (recurringTasksForToday) => {
    if (!recurringTasksForToday || recurringTasksForToday.length === 0) return;
    
    const newAllTasks = { ...allTasks };
    const todayList = newAllTasks[todayStr] || [];
    let updated = false;

    const newTodayList = [...todayList];

    recurringTasksForToday.forEach(rt => {
      // Check if already injected
      const exists = newTodayList.some(t => t.type === 'recurring' && t.recurringId === rt.id);
      if (!exists) {
        newTodayList.push({
          id: crypto.randomUUID(),
          title: rt.title,
          completed: false,
          type: 'recurring',
          recurringId: rt.id
        });
        updated = true;
      }
    });

    if (updated) {
      newAllTasks[todayStr] = newTodayList;
      saveTasks(newAllTasks);
    }
  };

  const checkCarryForward = () => {
    const yesterdayStr = getYesterdayStr();
    const yesterdayTasks = allTasks[yesterdayStr] || [];
    const incompleteOneTime = yesterdayTasks.filter(t => !t.completed && t.type === 'one-time');
    return incompleteOneTime;
  };

  const carryForward = () => {
    const incompleteOneTime = checkCarryForward();
    if (incompleteOneTime.length > 0) {
      const newAllTasks = { ...allTasks };
      if (!newAllTasks[todayStr]) newAllTasks[todayStr] = [];
      
      const newTasks = incompleteOneTime.map(t => ({
        ...t,
        id: crypto.randomUUID(), // new id
        completed: false
      }));
      
      newAllTasks[todayStr] = [...newAllTasks[todayStr], ...newTasks];
      saveTasks(newAllTasks);
      return true; // Indicates tasks were carried forward
    }
    return false;
  };

  return {
    tasks,
    allTasks,
    addTask,
    toggleTask,
    deleteTask,
    injectRecurring,
    checkCarryForward,
    carryForward,
    todayStr
  };
}
