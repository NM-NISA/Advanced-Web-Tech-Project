import api from './api';

export const updateProfile =
  async (
    full_name: string,
    phone: string,
  ) => {

    const res = await api.patch(
      '/users/profile',
      {
        full_name,
        phone,
      },
    );

    return res.data;
  };