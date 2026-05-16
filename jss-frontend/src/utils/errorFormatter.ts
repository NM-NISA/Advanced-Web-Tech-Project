export const formatError = (error: any) => {
  const message = error?.response?.data?.message;

  if (!message) return 'Something went wrong';

  if (Array.isArray(message)) {
    return message.join('\n');
  }

  return message;
};