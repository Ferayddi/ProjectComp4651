import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const uploadDataset = (formData) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };

    return axios
        .post(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/dataset`,
            formData,
            config
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const retrieveDatasets = () => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    return axios
        .get(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/dataset`,
            config
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const deleteDataset = (id, success_function) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: id,
        },
    };

    return axios
        .delete(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/dataset`,
            config
        )
        .then((response) => {
            if (response.status === 200) {
                success_function();
            }
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};