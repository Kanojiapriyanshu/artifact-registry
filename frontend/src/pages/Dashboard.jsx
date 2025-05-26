import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ArtifactCard from '../components/ArtifactCard';

export default function Dashboard() {
  const { logout } = useAuth();
  const [artifacts, setArtifacts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchArtifacts = async () => {
    const { data } = await API.get('/artifacts');
    setArtifacts(data);
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
  }, []);

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mt-6 mb-4">My Artifacts</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 mr-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
      </div>

      <div className="grid gap-4">
        {artifacts.map((a) => (
          <ArtifactCard key={a._id} artifact={a} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
