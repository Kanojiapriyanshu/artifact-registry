import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      login(data.token);
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white px-10">
      <div className="text-left max-w-md">
  <h1 className="text-4xl font-bold mb-4">
    Welcome to <br /> TaskFlow! <span className="inline-block">🔐</span>
  </h1>
  <p className="text-lg">
    Manage digital artifacts with confidence. RegiFlow keeps your data versioned, verified, and fully isolated — all while simplifying your developer workflow.
  </p>
</div>
<p className="absolute bottom-4 text-sm text-white/60">
  © 2024 RegiFlow. All rights reserved.
</p>

      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm mb-6 text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Create a new account now.
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login Now
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-200">
            <FcGoogle size={20} />
            Login with Google
          </button>

          <div className="mt-4 text-sm text-gray-500 text-center">
            Forgot password?{" "}
            <a href="#" className="text-blue-600 hover:underline">Click here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
