import axios from "axios";

const baseURL = "http://localhost:8000";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default instance;
