export function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayName(dateStr) {
  // dateStr is 'YYYY-MM-DD'
  // using split to avoid timezone parsing issues with 'YYYY-MM-DD'
  const [year, month, day] = dateStr.split('-');
  const d = new Date(year, month - 1, day);
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[d.getDay()];
}

export function getMonthGrid(year, month) {
  // month is 0-indexed here
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay(); // 0 is Sun
  
  const days = [];
  // padding previous month
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  
  // current month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dStr = String(d).padStart(2, '0');
    const mStr = String(month + 1).padStart(2, '0');
    days.push(`${year}-${mStr}-${dStr}`);
  }
  
  return days;
}
