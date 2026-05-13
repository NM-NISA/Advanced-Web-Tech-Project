'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';

import JobCard from '@/components/JobCard';

import { getJobs } from '@/services/jobService';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState('');

  const [search, setSearch] = useState('');

  const [location, setLocation] = useState('');

  const [page, setPage] = useState(1);

  const [limit] = useState(5);

  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    const data = await getJobs({
      title: search,
      location,
      page,
      limit,
    });

    setJobs(data.jobs);

    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchJobs();
  }, [search, location, page]);

  const handleSearch = () => {
    setPage(1); 
    setSearch(searchInput);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Available Jobs
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search job title..."
            className="border p-2 rounded w-1/3"
            value={searchInput}
            onChange={(e) =>
              setSearchInput(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location..."
            className="border p-2 rounded w-1/3"
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 rounded"
          >
            Search
          </button>
        </div>

        <div className="grid gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}