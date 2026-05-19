import api from './api';

export const applyForJob = async (
  jobId: number,
  cvFile: File,
) => {
  const formData = new FormData();

  formData.append('jobId', String(jobId));

  formData.append('cv', cvFile);

  const res = await api.post(
    '/applications',
    formData,
    {
      headers: {
        'Content-Type':
          'multipart/form-data',
      },
    },
  );

  return res.data;
};

export const getMyApplications =
  async () => {
    const res = await api.get(
      '/applications/my',
    );

    return res.data;
  };

export const withdrawApplication =
  async (id: number) => {
    const res = await api.delete(
      `/applications/${id}`,
    );

    return res.data;
  };

export const getApplicationAnalysis = 
  async (id: number) => {
    const res = await api.get(
      `/applications/${id}/analyze`
    );

    return res.data;
  };
