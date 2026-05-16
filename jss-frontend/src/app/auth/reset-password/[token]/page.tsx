'use client';

import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';

import toast, { Toaster } from 'react-hot-toast';

import { resetPassword } from '@/services/authService';

import { formatError } from '@/utils/errorFormatter';

export default function ResetPasswordPage() {

  const params = useParams();

  const router = useRouter();

  const token = params.token as string;

  const [newPassword, setNewPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await resetPassword(
        token,
        newPassword,
      );

      toast.success(res.message);

      setTimeout(() => {
        router.push('/login');
      }, 1500);

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

          <h1 className="text-2xl font-bold mb-4">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full border p-2 mb-4"
              required
            />

            <button
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 w-full"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}