import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const getUserWatchlist = (email) => {
    return axiosInstance.get(`${config.serverUrl}/watchlist/${email}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to get user ${email}'s watchlist. Error: ${error}`);
            throw error;
        });
};

const updateUserWatchlist = (action, email, entityId, entityType) => {
    const payload = {
        action,
        email,
        entityId,
        entityType
    };

    return axiosInstance.post(`${config.serverUrl}/watchlist`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to ${action} ${entityType} id ${entityId} in user ${email}'s watchlist. Error: ${error}`);
            throw error;
        });
};

const watchlistService = {
    getUserWatchlist,
    updateUserWatchlist
};

export default watchlistService;