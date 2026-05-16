'use client';

import { useState } from 'react';

import Navbar from '@/components/Navbar';

import toast, {
  Toaster,
} from 'react-hot-toast';

import {
  forgotPassword,
} from '@/services/authService';

import { formatError } from '@/utils/errorFormatter';

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await forgotPassword(
            email,
          );

        toast.success(
          res.message,
        );

        setEmail('');
      } catch (error: any) {
        toast.error(formatError(error));
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <Navbar />

      <Toaster />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Forgot Password
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              className="w-full border p-3 rounded"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              {loading
                ? 'Sending...'
                : 'Send Reset Link'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}