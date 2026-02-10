import axiosInstance from '../api/axiosInstance';
import type { IssueProps, QueryProps } from '../utils/interfaces/issueInterface';

export const createIssue = async (data: IssueProps) => {
  try {
    const res = await axiosInstance.post('/issues/create-issue', data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get('/issues/all-users');
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllIssues = async (query: QueryProps) => {
  try {
    const res = await axiosInstance.get('/issues/all-issues', {
      params: query,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
