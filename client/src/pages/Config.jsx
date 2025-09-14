// src/axiosConfig.js
import axios from "axios";

// ek axios instance banao
let api = axios.create({
  baseURL: "http://localhost:3001/api", // apna backend base url
});

// har request ke sath token bhejne ke liye interceptor
api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
