import axios from "axios";
import authService from "../services/auth.service";
import { config } from "../config/config";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (value) => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;

        if (user && value.url.startsWith(config.firebase.url)) {
            if (new Date(user?.expirationDate) <= new Date()) {
                await authService.refreshToken();
            }
        }

        return value;
    },
    error => {
        return Promise.reject(error);
    }
);