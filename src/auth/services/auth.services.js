import { getCookie } from "../../services/cookies";
import { services } from "../../services/services";
import { auth } from "../../services/auth";
import Cookies from "js-cookie";

export const saveToken = (jwt) => Cookies.set("token", jwt);
export const getToken = () => Cookies.get("token");

export const validateSession = async (token) => {
  try {
    if (token) {
      const { data } = await services.getProfile(token);
      return data;
    }
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const getUserData = async (token) => {
  try {
    
    const data = await services.getProfile(token);
    
    return data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const getCurrentUser = () => {
  return getCookie("token");
};

export const authenticate = async ({ email, password }) => {
  const data = await auth.login({ email, password });
  saveToken(data?.token);
  return data;
};
