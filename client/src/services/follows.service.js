import axios from "axios";
import { config } from "../config/config";

const loadFollowers = (email, pageNumber) => {
    return axios.get(`${config.serverUrl}/follows/${email}/followers/`, {
        params: { pageNumber }
    }).then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch followers details. Error: ${error}`);
            throw error;
        });
};

const loadFollowings = (email, pageNumber) => {
    return axios.get(`${config.serverUrl}/follows/${email}/following/`, {
        params: { pageNumber }
    }).then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most followings details. Error: ${error}`);
            throw error;
        });
};

const updateFollower = (action, emailFrom, emailTo) => {
    return axios.post(`${config.serverUrl}/follows`, { action, emailFrom, emailTo })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to remove follower. Error: ${error}`);
            throw error;
        });
};

const updateFollowing = (action, emailFrom, emailTo) => {
    return axios.post(`${config.serverUrl}/follows`, { action, emailFrom, emailTo })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to remove following. Error: ${error}`);
            throw error;
        });
};


const followsService = {
    loadFollowers,
    loadFollowings,
    updateFollower,
    updateFollowing
};

export default followsService;