import { useState, useEffect } from "react";
import axios from "axios";

export const useBackend = () => {
	const [data, setData] = useState(null);
	
	const [error, setError] = useState(null);

	const sendRequest = async (url, method, requestData = null) => {
        try {
            console.log(requestData)
            const response = await axios({ method, url, data: requestData });
            console.log(response);
            setData(response);
            return response
        } catch (error) {
            console.log(error);
			if (error.response) {
				setError(error.response.data);
				return error.response.data;
            } else {
				setError(error.message);
				return { message: error.message };
			}
		}
	};

	return { sendRequest, data, error };
};
