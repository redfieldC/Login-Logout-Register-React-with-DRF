import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const registerUser = (username, password, email) => {
    return axios.post(`${API_URL}register/`, {
        username,
        password,
        email
    });
};

export const loginUser = (username, password) => {
    return axios.post(`${API_URL}login/`, {
        username,
        password
    });
};

export const logoutUser = (refreshToken) => {
    return axios.post(`${API_URL}logout/`, {
        refresh: refreshToken
    });
};
