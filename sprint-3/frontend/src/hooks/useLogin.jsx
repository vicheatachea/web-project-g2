import { loginUser } from "../utils/userRequests";
import Cookies from "js-cookie";

export const useLogin = () => {
	const login = async (email, password) => {
		try {
			const response = await loginUser({
				email,
				password,
			});

			//For debugging purposes
			//console.log(response)

			if (response.status === 200) {
				Cookies.set("jwt", response.data.token, { expires: 1 });
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

	return { login };
};
