import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const searchUsers = (currentPage,  emailSearchValue, displayNameSearchValue) => {
    return axiosInstance.get(`${config.serverUrl}/users`, {
        params: {
            page: currentPage,
            emailSearchValue : emailSearchValue,
            displayNameSearchValue: displayNameSearchValue
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch users. Error: ${error}`);
            throw error;
        });
};

const userService = {
    searchUsers
};

export default userService;
