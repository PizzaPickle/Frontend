import axios from "axios";

const axiosDefault = () => {
  const instance = axios.create({
    baseURL: import.meta.env.REACT_APP_BASE_REQUEST_URL,
    withCredentials: true,
  });
  return instance;
};

export const defaultInstance = axiosDefault();
