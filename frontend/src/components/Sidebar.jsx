import { FiGrid, FiCalendar, FiClipboard, FiPieChart, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 h-screen bg-white border-r shadow-sm p-6">
      {/* Logo + Nav */}
      <div>
        <h2 className="text-2xl font-bold text-indigo-600 mb-8">RegiFlow</h2>
        <nav className="space-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-indigo-50">
            <FiGrid />
            Dashboard
          </div>
          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-indigo-50">
            <FiClipboard />
            Tasks
          </div>
          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-indigo-50">
            <FiCalendar />
            Calendar
          </div>

          <p className="text-xs text-gray-400 mt-6 mb-2 uppercase">Shortcuts</p>

          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-indigo-50">
            <FiPieChart />
            Analytics
          </div>
          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-indigo-50">
            <FiSettings />
            Settings
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
        >
          <FiLogOut />
          Logout
        </button>
        <p className="text-xs text-gray-400 mt-4">© 2024 RegiFlow</p>
      </div>
    </aside>
  );
}
