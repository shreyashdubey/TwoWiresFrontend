import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
