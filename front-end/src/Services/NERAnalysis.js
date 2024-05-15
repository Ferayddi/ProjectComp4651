import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

export const quickNERAnalysis = (textString) => {
    const token = secureLocalStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = {
        textString: textString,
    };

    return axios
        .post(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/neranalysis/quickresult`,
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