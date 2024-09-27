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

async function searchSpotify(req, res, next) {
    const searchQuery = req.query.q;
    const searchType = req.query.type;

    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`, {
                headers: {Authorization: "Bearer " + tokenStorage.accessToken}
            });

        res.json(response.data); // Replace with res.status().json()
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

        const albums = dataAlbums.map(album => {
            const artists = album.artists.map(artist => ({
                id: artist.id,
                name: artist.name
            }));

            const image300x300 = album.images.find(image => image.height === 300 && image.width === 300);

            return {
                id: album.id,
                name: album.name,
                type: album.type,
                image_url: image300x300 ? image300x300.url : null,
                artists: artists
            };
        });

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

        const tracks = dataTracks.map(item => {
            const track = item.track;
            const artists = track.artists.map(artist => ({
                id: artist.id,
                name: artist.name
            }));

            const image300x300 = track.album.images.find(image => image.height === 300 && image.width === 300);

            return {
                id: track.id,
                name: track.name,
                type: track.type,
                image_url: image300x300 ? image300x300.url : null,
                artists: artists
            };
        });

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
