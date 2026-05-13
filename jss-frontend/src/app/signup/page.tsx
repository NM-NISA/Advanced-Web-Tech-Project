'use client';

import { useState } from 'react';

import Navbar from '@/components/Navbar';

import api from '@/services/api';

import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'jobseeker',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
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
      await api.post(
        '/auth/register',
        formData,
      );

      toast.success('Registration successful');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Registration failed',
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
            Signup
          </h2>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
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

          <select
            name="role"
            className="w-full border p-3 mb-4 rounded"
            onChange={handleChange}
          >
            <option value="jobseeker">
              Job Seeker
            </option>

            <option value="employer">
              Employer
            </option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}