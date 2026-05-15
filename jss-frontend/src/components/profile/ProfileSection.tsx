'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { updatePassword } from '@/services/passwordService';

export default function ProfileSection({
  profile,
}: {
  profile: any;
}) {
  const [currentPassword,
    setCurrentPassword] =
    useState('');

  const [newPassword,
    setNewPassword] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  const handleUpdatePassword =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await updatePassword(
          currentPassword,
          newPassword,
        );

        toast.success(
          'Password updated successfully',
        );

        setCurrentPassword('');

        setNewPassword('');
      } catch (error: any) {
        toast.error(
          error.response?.data
            ?.message ||
            'Update failed',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className=" max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">

      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        My Profile
      </h2>

      <div className="space-y-3 mb-8">
        <p>
          <b>Name:</b>{' '}
          {profile?.full_name}
        </p>

        <p>
          <b>Email:</b>{' '}
          {profile?.email}
        </p>

        <p>
          <b>Phone:</b>{' '}
          {profile?.phone}
        </p>

        <p>
          <b>Role:</b>{' '}
          {profile?.role}
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Update Password
        </h3>

        <form
          onSubmit={
            handleUpdatePassword
          }
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value,
              )
            }
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value,
              )
            }
            className="w-full border p-3 rounded"
            required
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? 'Updating...'
              : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}