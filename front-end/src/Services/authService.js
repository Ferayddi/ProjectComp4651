import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const login = (userEmail, password) => {
    return axios
        .post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/login`, {
            userEmail,
            password,
        }).then(response =>{
            secureLocalStorage.setItem("accessToken", response.data.accessToken);
            secureLocalStorage.setItem("userName", response.data.userName);
            delete response.data.accessToken;
            return response.data;
        }).catch((error=>{
            return error.response.data;
        }))
}

export const register = (userName, userEmail, password) => {
    return axios
        .post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/register`, {
            userName,
            userEmail,
            password,
        }).then(response =>{
            secureLocalStorage.setItem("accessToken", response.data.accessToken);
            secureLocalStorage.setItem("accessToken", userName);
            delete response.data.accessToken;
            return response.data;
        }).catch((error)=>{
            return error.response.data;
        })
}