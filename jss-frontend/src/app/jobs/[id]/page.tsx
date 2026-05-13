'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';

import { getJobById } from '@/services/jobService';

import { useParams } from 'next/navigation';

export default function JobDetailsPage() {
  const { id } = useParams();

  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobById(
        Number(id),
      );

      setJob(data);
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto bg-gray-200 p-8">
        <h1 className="text-4xl font-bold text-blue-700">
          {job.title}
        </h1>

        <p className="mt-4 text-gray-700">
          {job.description}
        </p>

        <p className="mt-4">
          <b>Location:</b> {job.location}
        </p>

        <p>
          <b>Salary:</b> {job.salary}
        </p>

        <p className="mt-4">
          <b>Employer:</b>{' '}
          {job.employer?.full_name}
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded">
          Apply Now
        </button>
      </div>
    </div>
  );
}