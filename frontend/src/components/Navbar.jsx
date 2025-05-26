import { useAuth } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Navbar() {
  const { logout } = useAuth();
  const [user, setUser] = useState('');

  const fetchUser = async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data.name || 'User');
    } catch {
      setUser('User');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="flex justify-end items-center p-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-4">
        <p className="text-gray-700 text-sm">Hi, <span className="font-semibold">{user}</span></p>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
}
