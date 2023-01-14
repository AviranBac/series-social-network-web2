import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const loadFollowers = (email, pageNumber) => {
    return axiosInstance.get(`${config.serverUrl}/follows/${email}/followers/`, {
        params: { pageNumber }
    }).then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch followers details. Error: ${error}`);
            throw error;
        });
};

const loadFollowings = (email, pageNumber) => {
    return axiosInstance.get(`${config.serverUrl}/follows/${email}/following/`, {
        params: { pageNumber }
    }).then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most followings details. Error: ${error}`);
            throw error;
        });
};

const isFollowing = (emailFrom, emailTo) => {
    return axiosInstance.get(`${config.serverUrl}/follows/${emailFrom}/following/${emailTo}`,)
        .then(response => response.data?._id)
        .catch(error => {
            console.error(`Error while trying to update follower. Error: ${error}`);
            throw error;
        });

};

const updateFollow = (action, emailFrom, emailTo) => {
    return axiosInstance.post(`${config.serverUrl}/follows`, { action, emailFrom, emailTo })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to update follower. Error: ${error}`);
            throw error;
        });
};

const followsService = {
    loadFollowers,
    loadFollowings,
    updateFollow,
    isFollowing
}

export default followsService;