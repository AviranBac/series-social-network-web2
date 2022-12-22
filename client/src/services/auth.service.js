import axios from 'axios';
import { config } from "../config/config";

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
            throw new Error(`Incorrect email and/or password, ${(error.response ? error.response?.data?.message : error.message)}`);
        })
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
            throw new Error(`Something went wrong while trying to register, ${(error.response ? error.response?.data?.message : error.message)}`);
        })
};

const updateUserDetails = (idToken, displayName) => {
    return axios.post(`${config.firebase.url}/accounts:update?key=${config.firebase.apiKey}`, {
        idToken,
        displayName,
        returnSecureToken: true
    })
        .then(response => response.data)
        .catch(error => {
            throw new Error(`Something went wrong while trying to register, ${(error.response ? error.response?.data?.message : error.message)}`);
        })
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