import axios from 'axios';

export const registerUser = async (userData) => {
    const response = await axios.post("/api/user/register", userData);
    return response.data.token;
};

export const loginUser = async (userData) => {
    const response = await axios.post("/api/user/login", userData);
    return response.data.token;

};