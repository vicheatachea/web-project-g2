import React from "react";
import { registerUser } from "../utils/userRequests";
import Cookies from "js-cookie";

export const useRegister = () => {
	const register = async (username, email, password) => {
		try {
			const response = await registerUser({
				username,
				email,
				password,
			});

			//For debugging purposes
			//console.log(response);

			if (response.status === 200) {
				Cookies.set("jwt", response.data.token, { expires: 24 });
				return {
					status: response.status,
					data: response.data,
					message: response.data.message,
				};
			}
		} catch (err) {
			return err.response.data;
		}
	};

	return { register };
};
