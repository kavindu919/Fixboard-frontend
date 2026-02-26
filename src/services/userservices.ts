import axiosInstance from '../api/axiosInstance';

export const getAllTeam = async () => {
  try {
    const res = await axiosInstance.get('/users/get-allusers');
    return res;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async (id: string) => {
  try {
    const res = await axiosInstance.post('/users/delete-user', { id });
    return res;
  } catch (error) {
    throw error;
  }
};
