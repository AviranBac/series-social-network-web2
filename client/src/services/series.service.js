import axios from "axios";
import { config } from "../config/config";

const loadSeriesDetails = (seriesId) => {
    return axios.get(`${config.serverUrl}/series/${seriesId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch series details for seriesId ${seriesId}. Error: ${error}`);
            throw error;
        });
};

const seriesService = {
    loadSeriesDetails
};

export default seriesService;