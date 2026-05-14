'use client';

import { useEffect, useState } from 'react';

import Navbar from '@/components/Navbar';

import toast, {
  Toaster,
} from 'react-hot-toast';

import {
  getEmployerJobs,
  createJob,
  updateJob,
  deleteJob,
  getApplicants,
  updateApplicationStatus,
} from '@/services/employerService';

export default function EmployerPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  const [selectedApplicants,
    setSelectedApplicants] =
    useState<any[]>([]);

  const [selectedJob,
    setSelectedJob] =
    useState<number | null>(null);

  const [editingJobId,
    setEditingJobId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState({
      title: '',
      description: '',
      salary: '',
      location: '',
    });

  const fetchJobs = async () => {
    try {
      const data =
        await getEmployerJobs();

      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent,
    ) => {
      e.preventDefault();

      try {
        const payload = {
          ...formData,
          salary: Number(
            formData.salary,
          ),
        };

        if (editingJobId) {
          await updateJob(
            editingJobId,
            payload,
          );

          toast.success(
            'Job updated successfully',
          );
        }

        else {
          await createJob(payload);

          toast.success(
            'Job created successfully',
          );
        }

        setFormData({
          title: '',
          description: '',
          salary: '',
          location: '',
        });

        setEditingJobId(null);

        fetchJobs();
      } catch (error: any) {
        toast.error(
          error.response?.data
            ?.message ||
            'Operation failed',
        );
      }
    };

  const handleDeleteJob =
    async (id: number) => {
      try {
        await deleteJob(id);

        toast.success(
          'Job deleted successfully',
        );

        fetchJobs();
      } catch (error: any) {
        toast.error(
          error.response?.data
            ?.message ||
            'Delete failed',
        );
      }
    };

  const handleEditJob = (
    job: any,
  ) => {
    setEditingJobId(job.id);

    setFormData({
      title: job.title,
      description:
        job.description,
      salary:
        String(job.salary),
      location: job.location,
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancelEdit =
    () => {
      setEditingJobId(null);

      setFormData({
        title: '',
        description: '',
        salary: '',
        location: '',
      });
    };

  const handleViewApplicants =
    async (jobId: number) => {
      try {
        const data =
          await getApplicants(jobId);

        setSelectedApplicants(data);

        setSelectedJob(jobId);
      } catch (error) {
        console.log(error);
      }
    };

  const handleStatusUpdate =
    async (
      applicationId: number,
      status: string,
    ) => {
      try {
        await updateApplicationStatus(
          applicationId,
          status,
        );

        toast.success(
          'Status updated',
        );

        if (selectedJob) {
          handleViewApplicants(
            selectedJob,
          );
        }
      } catch (error: any) {
        toast.error(
          error.response?.data
            ?.message ||
            'Update failed',
        );
      }
    };

  return (
    <div>
      <Navbar />

      <Toaster />

      <div className="max-w-7xl mx-auto p-8">

        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            {editingJobId
              ? 'Edit Job'
              : 'Create Job'}
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={
                formData.salary
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded"
              required
            />

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded">
                {editingJobId
                  ? 'Update Job'
                  : 'Create Job'}
              </button>

              {editingJobId && (
                <button
                  type="button"
                  onClick={
                    handleCancelEdit
                  }
                  className="bg-gray-500 text-white px-6 py-3 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            My Jobs
          </h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-5"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">
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

                  <div className="space-x-3">

                    <button
                      onClick={() =>
                        handleEditJob(
                          job,
                        )
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleViewApplicants(
                          job.id,
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Applicants
                    </button>

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
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedApplicants.length >
          0 && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Applicants
            </h2>

            <div className="space-y-4">
              {selectedApplicants.map(
                (applicant) => (
                  <div
                    key={
                      applicant.id
                    }
                    className="border rounded-lg p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">
                        {
                          applicant
                            .user
                            ?.full_name
                        }
                      </h3>

                      <p>
                        {
                          applicant
                            .user
                            ?.email
                        }
                      </p>

                      <p>
                        Status:
                        <span className="font-bold text-blue-600 ml-2">
                          {
                            applicant.status
                          }
                        </span>
                      </p>

                      <a
                        href={`http://localhost:3000/uploads/${applicant.cv_file}`}
                        target="_blank"
                        className="text-green-600 mt-2 inline-block"
                      >
                        Download CV
                      </a>
                    </div>

                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            applicant.id,
                            'accepted',
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            applicant.id,
                            'rejected',
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}