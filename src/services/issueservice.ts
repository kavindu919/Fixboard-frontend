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

export const getIssueById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/issues/get-issue/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateIssue = async (data: IssueProps) => {
  try {
    const res = await axiosInstance.post('/issues/update-issue', data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteIssue = async (id: string) => {
  try {
    const res = await axiosInstance.post('/issues/delete-issue', { id });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getIssueStats = async () => {
  try {
    const res = await axiosInstance.get('/issues/issues-count');
    return res;
  } catch (error) {}
};

export const updateIssueStatus = async (id: string, status: string) => {
  try {
    const res = await axiosInstance.post('/issues/update-issuess-status', {
      id,
      status,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const exportIssue = async (format: string) => {
  try {
    const res = await axiosInstance.get(`/issues/issues-export?format=${format}`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], {
      type: format === 'csv' ? 'text/csv' : 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `issues.${format}`;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};
