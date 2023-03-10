import { config } from "../config/config";
import axios from "axios";

const loadSeriesDetails = (seriesId) => {
    return axios.get(`${config.serverUrl}/series/${seriesId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch series details for seriesId ${seriesId}, Error: ${error}`);
            throw error;
        });
};

const getMostRecommendedSeries = (email, pageNumber = 1) => {
    return axios.get(`${config.serverUrl}/series/commonAmongFollowing/${email}`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most recommended series details, Error: ${error}`);
            throw error;
        });
};

const getMostPopularSeries = (pageNumber = 1) => {
    return axios.get(`${config.serverUrl}/series/popular`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most popular series details, Error: ${error}`);
            throw error;
        });
};

const getSeriesFilterTypes = () => {
    return axios.get(`${config.serverUrl}/series/filters`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch series filters, Error: ${error}`);
            throw error;
        });
};

const getSeriesByFilters = (query, pageNumber = 1) => {
    const params = { ...query, pageNumber };
    return axios.get(`${config.serverUrl}/series`, { params })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch series filters, Error: ${error}`);
            throw error;
        });
};

const getTopRatedSeries = (pageNumber = 1) => {
    return axios.get(`${config.serverUrl}/series/topRated`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch top rated series details. Error: ${error}`);
            throw error;
        });
};

const getMostWatchedSeries = (pageNumber = 1) => {
    return axios.get(`${config.serverUrl}/series/mostWatched`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most watched series details. Error: ${error}`);
            throw error;
        });
};

const seriesService = {
    loadSeriesDetails,
    getMostRecommendedSeries,
    getMostPopularSeries,
    getSeriesFilterTypes,
    getSeriesByFilters,
    getTopRatedSeries,
    getMostWatchedSeries
};

export default seriesService;