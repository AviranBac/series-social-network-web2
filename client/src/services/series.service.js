import { config } from "../config/config";
import { axiosInstance } from "../utils/AxiosInstance";

const loadSeriesDetails = (seriesId) => {
    return axiosInstance.get(`${config.serverUrl}/series/${seriesId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch series details for seriesId ${seriesId}. Error: ${error}`);
            throw error;
        });
};

const getMostRecommendedSeries = (email, pageNumber = 1) => {
    return axiosInstance.get(`${config.serverUrl}/series/commonAmongFollowing/${email}`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most recommended series details. Error: ${error}`);
            throw error;
        });
};

const getMostPopularSeries = (pageNumber = 1) => {
    return axiosInstance.get(`${config.serverUrl}/series/popular`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch most popular series details. Error: ${error}`);
            throw error;
        });
};

const getTopRatedSeries = (pageNumber = 1) => {
    return axiosInstance.get(`${config.serverUrl}/series/topRated`, {
        params: { pageNumber }
    })
        .then(response => response.data)
        .catch(error => {
            console.error(`Error while trying to fetch top rated series details. Error: ${error}`);
            throw error;
        });
};

const seriesService = {
    loadSeriesDetails,
    getMostRecommendedSeries,
    getMostPopularSeries,
    getTopRatedSeries
};

export default seriesService;