import axiosInstance from "../api/axiosInstance";
import type {
  loginPageInterface,
  registerPageInterface,
} from "../utils/interfaces/authInterface";

export const userRegistration = async (validData: registerPageInterface) => {
  try {
    const res = await axiosInstance.post("/auth/register", validData);
    return res;
  } catch (error) {
    throw error;
  }
};
export const userLogin = async (validData: loginPageInterface) => {
  try {
    const res = await axiosInstance.post("/auth/login", validData);
    return res;
  } catch (error) {
    throw error;
  }
};
