import { Store } from "@reduxjs/toolkit";
import axios from "axios";

export const BACKEND_URL = "http://localhost:5000";

export const axiosPublic = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let store: Store | undefined;

export const injectStore = (_store: Store) => {
  store = _store;
};

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.token;

    if (token) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
