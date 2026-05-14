import api from './api';

export const getEmployerJobs =
  async () => {
    const res = await api.get(
      '/jobs/employer/my-jobs',
    );

    return res.data;
  };

export const createJob = async (
  data: any,
) => {
  const res = await api.post(
    '/jobs',
    data,
  );

  return res.data;
};

export const updateJob = async (
  id: number,
  data: any,
) => {
  const res = await api.patch(
    `/jobs/${id}`,
    data,
  );

  return res.data;
};

export const deleteJob = async (
  id: number,
) => {
  const res = await api.delete(
    `/jobs/${id}`,
  );

  return res.data;
};

export const getApplicants =
  async (jobId: number) => {
    const res = await api.get(
      `/applications/job/${jobId}`,
    );

    return res.data;
  };

export const updateApplicationStatus =
  async (id: number, status: string) => {
    const res = await api.patch(
      `/applications/${id}`,
      {
        status,
      },
    );

    return res.data;
  };