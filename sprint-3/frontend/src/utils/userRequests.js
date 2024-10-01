import axios from "axios";

export const registerUser = async (userData) => {
	const response = await axios.post("/api/user/register", userData);
	return response;
};

export const loginUser = async (userData) => {
	const response = await axios.post("/api/user/login", userData);
	return response;
};
