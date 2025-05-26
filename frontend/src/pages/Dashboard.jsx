// Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import ArtifactCard from '../components/ArtifactCard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const { logout } = useAuth();
  const [artifacts, setArtifacts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [user, setUser] = useState('');

  const fetchArtifacts = async () => {
    const { data } = await API.get('/artifacts');
    setArtifacts(data);
  };

  const fetchUser = async () => {
    const { data } = await API.get('/auth/me');
    setUser(data.name);
  };

  const handleCreate = async () => {
    await API.post('/artifacts', form);
    setForm({ title: '', description: '' });
    fetchArtifacts();
  };

  const handleDelete = async (id) => {
    await API.delete(`/artifacts/${id}`);
    fetchArtifacts();
  };

  useEffect(() => {
    fetchArtifacts();
    fetchUser();
    console.log("📦 Dashboard Rendered");
  }, []);

  const contributionData = [
    { week: 'Week 1', count: 3 },
    { week: 'Week 2', count: 7 },
    { week: 'Week 3', count: 4 },
    { week: 'Week 4', count: 6 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-6">
        <Navbar />

        {/* Greeting */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Hello {user} 👋</h1>
          <p className="text-gray-500 text-sm">
            Hope you have a great day, Let’s see what’s new task for you.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-sm">In Progress</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-bold">34</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-sm">On Hold</p>
            <p className="text-2xl font-bold">02</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-gray-400 text-sm">Total Tasks</p>
            <p className="text-2xl font-bold">40</p>
          </div>
        </section>

        {/* Chart & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Contribution</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Task List</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✅ Design web interface</li>
              <li>✅ Sprint planning</li>
              <li>🕗 UX writing</li>
            </ul>
          </div>
        </div>

        {/* Artifact Section */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Create Artifact</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 flex-1 rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 flex-1 rounded"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <button onClick={handleCreate} className="bg-indigo-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>

          <div className="grid gap-4">
            {artifacts.map((a) => (
              <ArtifactCard key={a._id} artifact={a} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
