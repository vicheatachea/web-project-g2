import axios from "axios";
import {redirect} from "react-router-dom";

function spotifyLogin() {
    redirect("/api/login");
}

// async function refreshToken() {
//     try {
//         const response = await axios.post("api/spotify/refresh-token");
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

async function searchSpotify(query) {
    try {
        const response = await axios.get("api/spotify/search", {
            params: {
                q: query,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function recommendedGenres() {
    try {
        const response = await axios.get("/api/spotify/genres");
        return response.data.genres;
    } catch (error) {
        console.error(error.response.status, error.response.data);
        return [];
    }
}

async function newReleases() {
    try {
        const response = await axios.get("api/spotify/new-releases");
        return response.data;
    } catch (error) {
        console.error(error.response.status, error.response.data);
        return [];
    }
}

async function topHits() {
    try {
        const response = await axios.get("api/spotify/new-releases");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export {
    spotifyLogin,
    searchSpotify,
    recommendedGenres,
    newReleases,
    topHits
};