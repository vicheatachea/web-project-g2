import { useState } from "react";
import axios from "axios";

export const useBackend = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const sendRequest = async (url, method, requestData = null) => {
        try {
            const response = await axios({ method, url, data: requestData });
            setData(response.data); // Ensure we set the actual data, not the entire response object

            return response.data; // Return the actual data
        } catch (error) {
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