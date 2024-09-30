const crypto = require("crypto");
const querystring = require("querystring");
const axios = require("axios");
require("dotenv").config();

// Get clientId and clientSecret
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const redirectUri = "http://localhost:4000/api/spotify/callback";
const stateKey = "spotify_auth_state";

// Token storage since there is only one user
let tokenStorage = {
    accessToken: null,
    refreshToken: null,
    accessTokenCreatedAt: null,
    refreshTokenCreatedAt: null
};

function generateRandomString(length) {
    return crypto.randomBytes(60).toString("hex").slice(0, length);
}

function loginUser(req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // The application will request authorization
    // The permissions in scope were removed since they are not needed but can be added it needed
    const scope = "";
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
        })
    );
}

async function callbackSpotify(req, res) {
    // The application requests refresh and access tokens after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
            querystring.stringify({
                error: "state_mismatch",
            })
        );
    } else {
        res.clearCookie(stateKey);
        try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                querystring.stringify({
                    code: code,
                    redirect_uri: redirectUri,
                    grant_type: "authorization_code",
                }), {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        Authorization: "Basic " + Buffer.from(
                            clientId + ":" + clientSecret).toString("base64"),
                    }
                });

            const {access_token, refresh_token} = response.data;
            Object.assign(tokenStorage, {
                accessToken: access_token,
                refreshToken: refresh_token,
                accessTokenCreatedAt: Date.now(),
                refreshTokenCreatedAt: Date.now(),
            });

            res.redirect('/');
        } catch (error) {
            res.redirect(
                "/#" +
                querystring.stringify({
                    error: "invalid_token",
                })
            );
        }
    }
}

async function refreshToken(req, res) {
    const refresh_token = tokenStorage.refreshToken;
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            }), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + Buffer.from(
                        clientId + ":" + clientSecret).toString("base64"),
                }
            });

        const {access_token, refresh_token: new_refresh_token} = response.data;

        Object.assign(tokenStorage, {
            accessToken: access_token,
            accessTokenCreatedAt: Date.now(),
        });

        // Replace with res.status().json()
        res.send({
            access_token: access_token,
            refresh_token: new_refresh_token,
        });
    } catch (error) {
        // Replace with res.status().json()
        res.status(500).send(error);
    }
}

// Filter data to get only the necessary information
function filterData(data, type, content) {
    return data.map(item => {
        // If you want to get the content of an album or playlist
        if (content) {
            item = item.track
        }

        // Get the middle image if it exists or the first image if it doesn't. Otherwise, set it to null
        const images = item.images || item.album?.images || [];
        let selectedImage = images.find(image => (image.height === 300 || image.height === 320));

        if (!selectedImage) {
            selectedImage = images.length > 1 ? images[1] : (images.length === 1 ? images[0] : null);
        }

        const artists = item.artists || item.album?.artists || [];
        const formattedArtists = artists.map(artist => ({
            id: artist.id,
            name: artist.name
        }));

        const owner = item.owner ? {
            id: item.owner.id,
            name: item.owner["display_name"]
        } : null;

        return {
            id: item.id,
            name: item.name,
            type: item.type || type,
            image_url: selectedImage ? selectedImage.url : null,
            artists: formattedArtists.length > 0 ? formattedArtists : undefined,
            owner: owner ? owner : undefined,
            genres: item.genres,
            followers: item.followers?.total
        };
    });
}

async function searchSpotify(req, res, next) {
    const searchQuery = req.query.q;
    const searchType = req.query.type;

    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`, {
                headers: {Authorization: "Bearer " + tokenStorage.accessToken}
            });

        const searchData = response.data[searchType + "s"];
        const searches = filterData(searchData.items, searchType);

        res.status(200).json(searches);
    } catch (error) {
        next(error);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function recommendedGenres(req, res, next) {
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/recommendations/available-genre-seeds", {
                headers: {Authorization: "Bearer " + tokenStorage.accessToken}
            });

        const TOTAL_GENRES = 10;
        const dataGenres = response.data.genres
        let genres = [];

        for (let i = 0; i < TOTAL_GENRES; i++) {
            const randomIndex = getRandomInt(dataGenres.length);
            if (!genres.includes(dataGenres[randomIndex])) {
                genres.push(dataGenres[randomIndex]);
            } else {
                i--;
            }
        }

        res.status(200).json({genres});
    } catch (error) {
        next(error);
    }
}

async function newReleases(req, res, next) {
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/browse/new-releases", {
                headers: {Authorization: "Bearer " + tokenStorage.accessToken}
            });

        const dataAlbums = response.data.albums.items;
        const albums = filterData(dataAlbums, "album");

        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
}

async function topHits(req, res, next) {
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
                headers: {Authorization: "Bearer " + tokenStorage.accessToken}
            });

        const dataTracks = response.data.tracks.items;
        const tracks = filterData(dataTracks, "track", true);

        res.status(200).json(tracks);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    tokenStorage,
    loginUser,
    callbackSpotify,
    refreshToken,
    searchSpotify,
    recommendedGenres,
    newReleases,
    topHits
};
