'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Lock, UserCircle2, ShieldCheck } from 'lucide-react';

export default function AdminSignupPage() {
  const [formData, setFormData] = useState({
    person: '',
    username: '',
    password: '',
    role: 'warden',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/signup', formData);
      toast.success('Signup successful!');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Signup failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center flex items-center justify-center gap-2">
          <ShieldCheck className="w-8 h-8" />
          Admin Signup
        </h2>

        {/* Full Name */}
        <div className="flex items-center border border-gray-300 rounded-lg mb-4 px-3 py-2">
          <UserCircle2 className="text-orange-500 mr-2" />
          <input
            type="text"
            name="person"
            placeholder="Full Name"
            value={formData.person}
            onChange={handleChange}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Username */}
        <div className="flex items-center border border-gray-300 rounded-lg mb-4 px-3 py-2">
          <User className="text-orange-500 mr-2" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-300 rounded-lg mb-4 px-3 py-2">
          <Lock className="text-orange-500 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Role Dropdown */}
        <div className="flex items-center border border-gray-300 rounded-lg mb-6 px-3 py-2">
          <ShieldCheck className="text-orange-500 mr-2" />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full outline-none bg-white"
          >
            <option value="warden">Warden</option>
            <option value="watchman">Watchman</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
