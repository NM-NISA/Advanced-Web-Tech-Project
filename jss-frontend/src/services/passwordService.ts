import api from './api';

export const updatePassword =
  async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const res = await api.patch(
      '/auth/update-password',
      {
        currentPassword,
        newPassword,
      },
    );

    return res.data;
  };