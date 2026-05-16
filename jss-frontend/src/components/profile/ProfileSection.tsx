'use client';

import { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import { updatePassword } from '@/services/passwordService';

import { updateProfile } from '@/services/userService';

export default function ProfileSection({
  profile,
}: {
  profile: any;
}) {

  const [fullName, setFullName] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [currentPassword,
    setCurrentPassword] =
    useState('');

  const [newPassword,
    setNewPassword] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(
        profile.full_name || '',
      );

      setPhone(
        profile.phone || '',
      );
    }
  }, [profile]);

  const handleUpdateProfile =
    async (
      e: React.FormEvent,
    ) => {

      e.preventDefault();

      try {
        setLoading(true);

        await updateProfile(
          fullName,
          phone,
        );

        toast.success(
          'Profile updated successfully',
        );

      } catch (error: any) {

        toast.error(
          error.response?.data
            ?.message ||
            'Profile update failed',
        );

      } finally {
        setLoading(false);
      }
    };

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
            'Password update failed',
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="space-y-8">

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">

        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          My Profile
        </h2>

        <form
          onSubmit={
            handleUpdateProfile
          }
          className="space-y-4"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value,
                )
              }
              className="w-full border p-3 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              value={
                profile?.email || ''
              }
              disabled
              className="w-full border p-3 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value,
                )
              }
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Role
            </label>

            <input
              type="text"
              value={
                profile?.role || ''
              }
              disabled
              className="w-full border p-3 rounded bg-gray-100"
            />
          </div>

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? 'Updating...'
              : 'Update Profile'}
          </button>

        </form>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">

        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Update Password
        </h2>

        <form
          onSubmit={
            handleUpdatePassword
          }
          className="space-y-4"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value,
                )
              }
              className="w-full border p-3 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value,
                )
              }
              className="w-full border p-3 rounded"
              required
            />
          </div>

          <button
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded"
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