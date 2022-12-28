import axios from 'axios';
import { config } from "../config/config";

const humanizeErrorMessage = (error) => {
    const errorMessage = error.response ? error.response?.data?.error?.message : error.message;

    switch (errorMessage) {
        case "EMAIL_EXISTS": return "This email is already in use.";
        case "WEAK_PASSWORD": return "Your password must be 6 characters long or more.";
        case "INVALID_EMAIL": return "Your email address is badly formatted.";
        case "EMAIL_NOT_FOUND":
        case "INVALID_PASSWORD":
            return "Invalid credentials. Please try again.";
        default: {
            console.error(errorMessage);
            return "Unknown error";
        }
    }
};

const login = (payload) => {
    const { email, password } = payload;

    return axios.post(`${config.firebase.url}/accounts:signInWithPassword?key=${config.firebase.apiKey}`, {
        email,
        password,
        returnSecureToken: true
    })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        })
        .catch(error => {
            throw new Error(humanizeErrorMessage(error));
        });
};

const register = (payload) => {
    const { email, password } = payload;

    return axios.post(`${config.firebase.url}/accounts:signUp?key=${config.firebase.apiKey}`, {
        email,
        password,
        returnSecureToken: true
    })
        .then(response => response.data)
        .catch(error => {
            throw new Error(humanizeErrorMessage(error));
        });
};

const updateUserDetails = (idToken, displayName) => {
    return axios.post(`${config.firebase.url}/accounts:update?key=${config.firebase.apiKey}`, {
        idToken,
        displayName,
        returnSecureToken: true
    })
        .then(response => response.data)
        .catch(error => {
            throw new Error(humanizeErrorMessage(error));
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

// TODO
const refreshToken = () => {};

const authService = {
    login,
    register,
    updateUserDetails,
    logout,
    refreshToken
};

export default authService;