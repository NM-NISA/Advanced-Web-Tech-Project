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