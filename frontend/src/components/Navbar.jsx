import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Artifact Registry</h1>
      <button onClick={logout} className="bg-white text-blue-600 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
