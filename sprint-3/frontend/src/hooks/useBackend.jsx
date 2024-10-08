import { useState, useEffect } from "react";
import axios from "axios";
export const useBackend = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    
    const sendRequest = async (url, method, requestData = null) => {
        try {
            const response = await axios({ method, url, data: requestData });
            if (response.data) {
                setData(response.data);
                setStatus(response.status);
                return response.data;
                
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
                setStatus(error.response.status);
                return error.response.data;
            } else {
                setError(error.message);
                return { message: error.message };
            }
        }
    };
    return { sendRequest, data, status, error };
};