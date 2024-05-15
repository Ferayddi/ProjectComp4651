export const uploadDataset = (formData) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {

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