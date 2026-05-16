'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';

import { getJobById } from '@/services/jobService';

import { applyForJob } from '@/services/applicationService';

import { useParams, useRouter } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';

import { formatError } from '@/utils/errorFormatter';

export default function JobDetailsPage() {
  const router = useRouter();

  const { id } = useParams();

  const [job, setJob] = useState<any>(null);

  const [cvFile, setCvFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobById(
        Number(id),
      );

      setJob(data);
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!cvFile) {
      toast.error('Please upload CV PDF');

      return;
    }

    try {
      setLoading(true);

      await applyForJob(job.id, cvFile);

      toast.success(
        'Application submitted successfully',
      );

      setCvFile(null);
    } catch (error: any) {
      toast.error(formatError(error));
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <Toaster />

    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">

        <button
          onClick={() => router.push('/jobs')}
          className="mb-6 text-gray-400 hover:text-gray-600 font-semibold transition"
        >
          &lt; &nbsp; Job List
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {job.title}
        </h1>

        <div className="flex flex-wrap gap-3 mt-4">
          <p>Location </p>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            📍 {job.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <p>Salary </p>
            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.salary} TK
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
          <p>Organizer </p>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.employer?.full_name}
            </span>
          </div>

        <div className="my-6 border-t" />

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Job Description
        </h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {job.description}
        </p>

        <div className="my-6 border-t" />

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <label className="block mb-3 font-semibold text-gray-800">
            Upload CV (PDF only)
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gray-300 file:text-white
                       hover:file:bg-gray-400"
          />

          {cvFile && (
            <p className="mt-2 text-sm text-green-600">
              Selected: {cvFile.name}
            </p>
          )}
        </div>

        <button
          onClick={handleApply}
          disabled={loading}
          className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all duration-200
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white shadow-md"
            }`}
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>
        </div>
    </div>
  </div>
  );
}