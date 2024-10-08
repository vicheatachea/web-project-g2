import {registerUser} from "../utils/userRequests";
import Cookies from "js-cookie";

export const useSignup = () => {
    const signup = async (username, email, password) => {
        try {
            const response = await registerUser({
                username,
                email,
                password,
            });

            if (response.status === 200) {
                console.log("Response:", response.data);
                Cookies.set("jwt", response.data.token, {expires: 1});
            } else {
                console.error("Registration failed:", response.statusText);
            }
        } catch (err) {
            console.error("Error:", err["response"]["data"]);
        }
    };

    return {signup};
};
