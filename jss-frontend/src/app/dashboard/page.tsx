'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';

import {
  getMyApplications,
  withdrawApplication,
} from '@/services/applicationService';

import {
  getProfile,
} from '@/services/authService';

import toast, {
  Toaster,
} from 'react-hot-toast';

import ProfileSection from '@/components/profile/ProfileSection';

export default function DashboardPage() {
  const [applications, setApplications] =
    useState<any[]>([]);

  const [profile, setProfile] =
    useState<any>(null);

  const fetchData = async () => {
    try {
      const profileData =
        await getProfile();

      setProfile(profileData);

      const appData =
        await getMyApplications();

      setApplications(appData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem('token');

    if (!token) {
      window.location.href =
        '/login';

      return;
    }

    fetchData();
  }, []);

  const handleWithdraw = async (
    id: number,
  ) => {
    try {
      await withdrawApplication(id);

      toast.success(
        'Application withdrawn',
      );

      fetchData();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Failed',
      );
    }
  };

  return (
    <div>
      <Navbar />

      <Toaster />

      <div className="max-w-8xl mx-auto bg-gray-100 p-8">
        
        <ProfileSection profile={profile} />

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            My Applications
          </h2>

          {applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <div className="space-y-4">
              {applications.map(
                (application) => (
                  <div
                    key={application.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">
                        {
                          application.job
                            ?.title
                        }
                      </h3>

                      <p>
                        {
                          application.job
                            ?.location
                        }
                      </p>

                      <p className="mt-2">
                        Status:{' '}
                        <span className="font-bold text-blue-600">
                          {
                            application.status
                          }
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleWithdraw(
                          application.id,
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Withdraw
                    </button>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}