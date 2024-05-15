import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

export const crawlReddits = (searchType, numPosts, datasetName) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {
        searchType: searchType,
        numPosts: numPosts,
        datasetName: datasetName
    };

    return axios
        .post(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/crawl/crawlReddit`,
            requestBody,
            config
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const crawlGoogle = (searchType, numLinks, datasetName) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {
        searchType: searchType,
        numPosts: numLinks,
        datasetName: datasetName
    };

    return axios
        .post(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/crawl/crawlGoogle`,
            requestBody,
            config
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};