import axiosInstance from "../api/axiosInstance";
import type { registerPageInterface } from "../utils/interfaces/authInterface";

export const userRegistration = async (validData: registerPageInterface) => {
  try {
    const res = await axiosInstance.post("/auth/register", validData);
    return res;
  } catch (error) {
    throw error;
  }
};
