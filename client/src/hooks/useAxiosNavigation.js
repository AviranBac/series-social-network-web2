import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from "../config/config";
import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/auth.slice";

export function useAxiosNavigation() {
    const navRef = useRef(useNavigate());
    const dispatch = useDispatch();

    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            async (value) => {
                if (value.url.startsWith(`${config.firebase.url}/token`)) {
                    return value;
                }

                const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
                const startRefreshingDate = new Date(new Date(user?.expirationDate).getTime() - parseInt(user?.expiresIn) - 5 * 60 * 1000);

                if (user && startRefreshingDate <= new Date()) {
                    try {
                        await authService.refreshToken();
                    } catch (error) {
                        console.error(error);
                        dispatch(logout());
                        navRef.current('/auth');
                    }
                }

                return value;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);
}