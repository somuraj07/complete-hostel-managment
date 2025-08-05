'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

        <input
          type="text"
          name="person"
          placeholder="Full Name"
          value={formData.person}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mb-4"
        >
          <option value="warden">Warden</option>
          <option value="watchman">Watchman</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
