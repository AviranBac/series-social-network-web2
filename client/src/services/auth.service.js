import axios from 'axios';
import { config } from "../config/config";

const humanizeErrorMessage = (error) => {
    const errorMessage = error.response ? error.response?.data?.error?.message : error.message;

    if (errorMessage.startsWith("EMAIL_EXISTS")) {
        return "This email is already in use.";
    }
    if (errorMessage.startsWith("WEAK_PASSWORD")) {
        return "Your password must be 6 characters long or more.";
    }
    if (errorMessage.startsWith("INVALID_EMAIL")) {
        return "Your email address is badly formatted.";
    }
    if (errorMessage.startsWith("EMAIL_NOT_FOUND") || errorMessage.startsWith("INVALID_PASSWORD")) {
        return "Invalid credentials. Please try again.";
    }

    console.error(errorMessage);
    return "Unknown error";
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

const updateUserDetails = ({ idToken, password, displayName }) => {
    return axios.post(`${config.firebase.url}/accounts:update?key=${config.firebase.apiKey}`, {
        idToken,
        password,
        displayName,
        returnSecureToken: true
    })
        .then(response => {
            const preUpdateUser = JSON.parse(localStorage.getItem('user'));
            const updatedUser = {
                ...preUpdateUser,
                idToken: response.data.idToken || preUpdateUser.idToken,
                displayName: response.data.displayName
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return updatedUser;
        })
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