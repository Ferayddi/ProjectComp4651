import axios from "axios";

export const login = (userEmail, password) => {
    return axios
        .post(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/login`, {
            userEmail,
            password,
        }).then(response =>{
            return response.data;
        }).catch((error=>{
            return error.response.data;
        }))
}