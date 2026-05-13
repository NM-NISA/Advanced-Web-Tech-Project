'use client';

import Link from 'next/link';

import { Job } from '@/types/job';

export default function JobCard({
  job,
}: {
  job: Job;
}) {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg border">
      <h2 className="text-xl font-bold text-blue-700">
        {job.title}
      </h2>

      <p className="text-gray-600">
        {job.location}
      </p>

      <p className="text-gray-800 mt-2">
        Salary: {job.salary}
      </p>

      <Link
        href={`/jobs/${job.id}`}
        className="text-blue-500 mt-3 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
}