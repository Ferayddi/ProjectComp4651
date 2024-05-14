import axios from 'axios';
import secureLocalStorage from "react-secure-storage";

export const quickNERAnalysis = (textString) => {
    const token = secureLocalStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append('textString', textString);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios
        .post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/neranalysis/quickresult`, formData, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};