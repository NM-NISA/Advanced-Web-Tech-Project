import api from './api';

export const getAllUsers =
  async () => {
    const res = await api.get(
      '/admin/users',
    );

    return res.data;
  };

export const deleteUser =
  async (id: number) => {
    const res = await api.delete(
      `/admin/users/${id}`,
    );

    return res.data;
  };

export const getAllJobs =
  async () => {
    const res = await api.get(
      '/admin/jobs',
    );

    return res.data;
  };

export const deleteAdminJob =
  async (id: number) => {
    const res = await api.delete(
      `/admin/jobs/${id}`,
    );

    return res.data;
  };

export const getStats =
  async () => {
    const res = await api.get(
      '/admin/stats',
    );

    return res.data;
  };