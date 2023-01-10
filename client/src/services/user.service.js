import axios from "axios";
import { config } from "../config/config";

const searchUser = (currentPage) => {
    return axios.get(`${config.serverUrl}/users`, {
        params: {
            page: currentPage,
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch users. Error: ${error}`);
            throw error;
        });
};

const userService = {
    searchUser
};

export default userService;
