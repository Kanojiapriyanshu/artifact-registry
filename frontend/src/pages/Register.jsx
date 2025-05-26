import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert('All fields are required.');
      return;
    }

    try {
      const { data } = await API.post('/auth/register', form);
      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed. Please try again.');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Panel (Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
          <p className="text-sm mb-6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-md transition duration-200"
            >
              Register Now
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-200"
          >
            <FcGoogle size={20} />
            Register with Google
          </button>

          <div className="mt-4 text-sm text-gray-500 text-center">
            Need help?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </div>
        </div>
      </div>

      {/* Right Panel (Welcome Gradient) */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white px-10">
        <div className="text-left max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome to TaskFlow 🚀</h1>
          <p className="text-lg">
            Join the smart way to manage your daily workflow. Automate tasks, collaborate seamlessly, and save time — all in one place.
          </p>
        </div>
        <p className="absolute bottom-4 text-sm text-white/60">
          © 2024 TaskFlow. All rights reserved.
        </p>
      </div>
    </div>
  );
}
