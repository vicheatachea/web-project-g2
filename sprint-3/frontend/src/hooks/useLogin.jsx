import React from "react";
import { loginUser } from "../utils/userRequests";
import Cookies from "js-cookie";

export const useLogin = () => {
	const login = async (email, password) => {
		try {
			const response = await loginUser({
				email,
				password,
			});

			if (response.status === 200) {
				console.log("Response:", response.data);
				Cookies.set("jwt", response.data.token, { expires: 1 });
			} else {
				console.error("Login failed:", response.statusText);
			}
		} catch (err) {
			console.error("Error:", err["response"]["data"]);
		}
	};

	return { login };
};
