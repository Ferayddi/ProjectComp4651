import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

export const crawlReddit = (searchQuery, numPosts, datasetName) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {
        search_query: searchQuery,
        num_posts: numPosts,
        dataset_name: datasetName
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

export const crawlGoogle = (searchQuery, numLinks, datasetName) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {
        search_query: searchQuery,
        num_links: numLinks,
        dataset_name: datasetName
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