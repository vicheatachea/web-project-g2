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
    // The permissions in scope were removed since they are not needed
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
            const response = await axios.post("https://accounts.spotify.com/api/token",
                querystring.stringify({
                    code: code,
                    redirect_uri: redirectUri,
                    grant_type: "authorization_code",
                }), {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
                    }
                });

            const { access_token, refresh_token } = response.data;
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
        const response = await axios.post("https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: "refresh_token",
                refresh_token: refresh_token,
            }), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
                }
            });

        const { access_token, refresh_token: new_refresh_token } = response.data;
        // Replace with res.status().json()
        res.send({
            access_token: access_token,
            refresh_token: new_refresh_token,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function searchSpotify(req, res) {
    const searchQuery = req.query.q;
    const searchType = req.query.type;

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`, {
            headers: { Authorization: "Bearer " + tokenStorage.accessToken }
        });

        res.json(response.data); // Replace with res.status().json()
    } catch (error) {
        res.status(500).send(error);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function recommendedGenres(req, res) {
    try {
        const response = await axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
            headers: { Authorization: "Bearer " + tokenStorage.accessToken }
        });

        const TOTAL_GENRES = 10;
        let genreArray = [];

        for (let i = 0; i < TOTAL_GENRES; i++) {
            const randomIndex = getRandomInt(response.data["genres"].length);
            genreArray.push(response.data["genres"][randomIndex]);
        }

        res.json(genreArray); // Replace with res.status().json()
    } catch (error) {
        res.status(500).send(error);
    }
}

async function newReleases(req, res) {
    try {
        const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
            headers: { Authorization: "Bearer " + tokenStorage.accessToken }
        });

        res.json(response.data); // Replace with res.status().json()
    } catch (error) {
        res.status(500).send(error);
    }
}

async function topHits (req, res) {
    try {
        // This endpoint is incomplete, likely needs to be replaced
        const response = await axios.get("https://api.spotify.com/v1/browse/recommendations", {
            headers: { Authorization: "Bearer " + tokenStorage.accessToken }
        });

        res.json(response.data); // Replace with res.status().json()
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    loginUser,
    callbackSpotify,
    refreshToken,
    searchSpotify,
    recommendedGenres,
    newReleases,
    topHits
};
