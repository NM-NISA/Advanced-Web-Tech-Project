'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';

import toast, {
  Toaster,
} from 'react-hot-toast';

import {
  getAllUsers,
  deleteUser,
  getAllJobs,
  deleteAdminJob,
  getStats,
} from '@/services/adminService';

import ProfileSection from '@/components/profile/ProfileSection';

import { getProfile } from '@/services/authService';

import { formatError } from '@/utils/errorFormatter';

export default function AdminPage() {
  const [users, setUsers] =
    useState<any[]>([]);

  const [jobs, setJobs] =
    useState<any[]>([]);

  const [stats, setStats] =
    useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

  const fetchData = async () => {
    try {
      const usersData =
        await getAllUsers();

      const jobsData =
        await getAllJobs();

      const statsData =
        await getStats();

      const profileData =
        await getProfile();

      setUsers(usersData);

      setJobs(jobsData);

      setStats(statsData);

      setProfile(profileData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser =
    async (id: number) => {
      try {
        await deleteUser(id);

        toast.success(
          'User deleted',
        );

        fetchData();
      } catch (error: any) {
        toast.error(formatError(error));
      }
    };

  const handleDeleteJob =
    async (id: number) => {
      try {
        await deleteAdminJob(id);

        toast.success(
          'Job deleted',
        );

        fetchData();
      } catch (error: any) {
        toast.error(formatError(error));
      }
    };

  return (
    <div>
      <Navbar />

      <Toaster />

      <div className="max-w-8xl mx-auto bg-gray-100 p-8">

        <ProfileSection profile={profile} />

        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mb-10">

          <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold">
              Total Users
            </h2>

            <p className="text-4xl mt-4">
              {
                stats?.totalUsers ||
                0
              }
            </p>
          </div>

          <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold">
              Total Jobs
            </h2>

            <p className="text-4xl mt-4">
              {
                stats?.totalJobs ||
                0
              }
            </p>
          </div>

          <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold">
              Applications
            </h2>

            <p className="text-4xl mt-4">
              {
                stats?.totalApplications ||
                0
              }
            </p>
          </div>

        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Users
          </h2>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {user.full_name}
                  </h3>

                  <p>
                    {user.email}
                  </p>

                  <p>
                    Role:
                    <span className="font-bold ml-2">
                      {user.role}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDeleteUser(
                      user.id,
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Jobs
          </h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {job.title}
                  </h3>

                  <p>
                    {job.location}
                  </p>

                  <p>
                    Salary:
                    {job.salary}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDeleteJob(
                      job.id,
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}