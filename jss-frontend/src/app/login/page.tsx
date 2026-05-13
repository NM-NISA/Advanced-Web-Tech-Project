'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';

import api from '@/services/api';

import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        '/auth/login',
        formData,
      );

      localStorage.setItem(
        'token',
        response.data.access_token,
      );

      toast.success('Login successful');

      router.push('/');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Login failed',
      );
    }
  };

  return (
    <div>
      <Navbar />

      <Toaster />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}