import axiosInstance from '../api/axiosInstance';

export const submitComments = async (comment: string, issueId: string) => {
  try {
    const res = await axiosInstance.post('/comment/create-comment', { comment, issueId });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllComments = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/comment/get-comments/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
