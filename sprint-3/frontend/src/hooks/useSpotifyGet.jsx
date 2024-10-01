import {useState, useEffect} from "react";
import axios from "axios";

export const useSpotifyGet = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error(error.response.status, error.response.data);
                return [];
            }
        };

        fetchData();
    }, [url]);

    return data;
}
