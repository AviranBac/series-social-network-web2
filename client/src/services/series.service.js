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

const getMostRecommendedSeries = () => {
    return axios.get(`${config.serverUrl}/series`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most recommended series details. Error: ${error}`);
            throw error;
        });
};

const getMostPopularSeries = () => {
    return axios.get(`${config.serverUrl}/series`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to most popular series details. Error: ${error}`);
            throw error;
        });
};

const seriesService = {
    loadSeriesDetails,
    getMostRecommendedSeries,
    getMostPopularSeries
};

export default seriesService;