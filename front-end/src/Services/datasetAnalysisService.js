export const analyzeDataset = (datasetName, analysisType) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {
        dataset_name: datasetName,
        analysis_type: analysisType,
    };

    return axios
        .post(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/analysis/new`,
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