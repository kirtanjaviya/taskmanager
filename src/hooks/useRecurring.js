import { useState, useEffect } from 'react';
import { getTodayStr, getDayName } from '../utils/dateUtils';

const RECURRING_KEY = 'recurring_tasks';

export function useRecurring() {
  const [recurringTasks, setRecurringTasks] = useState(() => {
    const saved = localStorage.getItem(RECURRING_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveRecurring = (newTasks) => {
    setRecurringTasks(newTasks);
    localStorage.setItem(RECURRING_KEY, JSON.stringify(newTasks));
  };

  const addRecurring = (title, schedule, days) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      schedule, // 'daily' or 'weekly'
      days: schedule === 'weekly' ? days : [],
      active: true,
      createdAt: getTodayStr()
    };
    saveRecurring([...recurringTasks, newTask]);
  };

  const toggleActive = (id) => {
    saveRecurring(
      recurringTasks.map(t => 
        t.id === id ? { ...t, active: !t.active } : t
      )
    );
  };

  const deleteRecurring = (id) => {
    saveRecurring(recurringTasks.filter(t => t.id !== id));
  };

  const getTasksForToday = () => {
    const todayStr = getTodayStr();
    const todayDayName = getDayName(todayStr); // 'mon', 'tue', etc.

    return recurringTasks.filter(task => {
      if (!task.active) return false;
      if (task.schedule === 'daily') return true;
      if (task.schedule === 'weekly' && task.days.includes(todayDayName)) return true;
      return false;
    });
  };

  return {
    recurringTasks,
    addRecurring,
    toggleActive,
    deleteRecurring,
    getTasksForToday
  };
}
