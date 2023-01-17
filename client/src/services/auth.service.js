import { config } from "../config/config";
import axios from "axios";

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
            const responseWithExpirationDate = {
                ...response.data,
                expirationDate: calculateExpirationDate(response.data.expiresIn)
            }
            localStorage.setItem('user', JSON.stringify(responseWithExpirationDate));
            return responseWithExpirationDate;
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
        displayName
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

const refreshToken = () => {
    const preUpdateUser = JSON.parse(localStorage.getItem('user'));

    return axios.post(`${config.firebase.url}/token?key=${config.firebase.apiKey}`, {
        grant_type: "refresh_token",
        refresh_token: preUpdateUser.refreshToken
    })
        .then(response => {
            const { expires_in: expiresIn, refresh_token: refreshToken, id_token: idToken } = response.data;
            const updatedUser = {
                ...preUpdateUser,
                expiresIn,
                idToken,
                refreshToken: refreshToken,
                expirationDate: calculateExpirationDate(expiresIn)
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        })
        .catch(error => {
            throw new Error(`You need to login. Error: ${humanizeErrorMessage(error)}`);
        });
};

const calculateExpirationDate = (expiresIn) => {
    return new Date(new Date().getTime() + expiresIn * 1000);
}

const authService = {
    login,
    register,
    updateUserDetails,
    logout,
    refreshToken
};

export default authService;