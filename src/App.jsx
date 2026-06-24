import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, CheckSquare, Repeat } from 'lucide-react';
import Today from './pages/Today';
import Recurring from './pages/Recurring';
import Progress from './pages/Progress';

function AppContent() {
  const location = useLocation();

  const getHeaderTitle = () => {
    if (location.pathname === '/') {
      const d = new Date();
      const formatted = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
      return (
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-slate-800">{formatted}</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">What's on your mind today?</p>
        </div>
      );
    }
    if (location.pathname === '/recurring') {
      return (
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-slate-800">Recurring Tasks</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Set up your routine once, flow everyday.</p>
        </div>
      );
    }
    if (location.pathname === '/progress') {
      return (
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-slate-800">Your Progress</h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">See how far you've come.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col bg-slate-50 shadow-xl shadow-slate-200/50">
      
      {/* Header / Nav */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 pt-5 pb-5">
        <div className="px-6 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
          {getHeaderTitle()}
          
          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg shrink-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`
              }
            >
              <CheckSquare className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Today</span>
            </NavLink>
            <NavLink
              to="/recurring"
              className={({ isActive }) =>
                `flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`
              }
            >
              <Repeat className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Recurring</span>
            </NavLink>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                `flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`
              }
            >
              <CalendarDays className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Progress</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/recurring" element={<Recurring />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
