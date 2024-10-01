import axios from "axios";

export const getUser = async () => {
    return axios.get("/api/user/data");
};

export const registerUser = async (userData) => {
	const response = await axios.post("/api/user/register", userData);
	return response;
};

export const loginUser = async (userData) => {
	const response = await axios.post("/api/user/login", userData);
	return response;
};

export const updateUser = async (userData) => {
    const response = await axios.patch("/api/user/update", userData);
    return response;
}

export const deleteUser = async (userId) => {
    const response = await axios.delete("/api/user/delete");
    return response;
}