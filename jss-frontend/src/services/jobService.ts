import api from './api';

export const getJobs = async (params?: any) => {
  const res = await api.get('/jobs', {
    params,
  });

  return res.data;
};

export const getJobById = async (id: number) => {
  const res = await api.get(`/jobs/${id}`);

  return res.data;
};