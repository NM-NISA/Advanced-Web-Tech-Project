import api from './api';

export const getProfile = async () => {
  const res = await api.get('/auth/me');

  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const forgotPassword =
  async (email: string) => {
    const res = await api.post(
      '/auth/forgot-password',
      { email },
    );

    return res.data;
  };

export const resetPassword =
  async (
    token: string,
    newPassword: string,
  ) => {
    const res = await api.post(
      `/auth/reset-password/${token}`,
      {
        newPassword,
      },
    );

    return res.data;
  };