'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/admin/login', formData);
      const { token, role } = res.data;

      if (!role) {
        toast.error('No role returned from server');
        return;
      }

      const normalizedRole = role.toLowerCase();
      localStorage.setItem('admin_token', token);

      toast.success('Login successful!');

      if (normalizedRole === 'warden') {
        router.push('/warden');
      } else if (normalizedRole === 'watchman') {
        router.push('/watchman');
      } else {
        toast.error(`Unknown role: ${role}`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-orange-200"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">Admin Login</h2>

        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm text-orange-700 mb-1">
            <User className="w-4 h-4" /> Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm text-orange-700 mb-1">
            <Lock className="w-4 h-4" /> Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
