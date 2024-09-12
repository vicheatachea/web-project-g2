const crypto = require("crypto");
const querystring = require("querystring");
const request = require("request");
const path = require("path");
const fs = require("fs");

// Get clientId and clientSecret from credentials.json
const filePath = path.join(__dirname, "credentials.json");
const jsonData = fs.readFileSync(filePath, "utf8");
const {clientId, clientSecret} = JSON.parse(jsonData);

const redirectUri = "http://localhost:4000/spotify/callback";
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
    // The permissions in scope are probably more than what's necessary for the program
    const scope = "user-read-private user-read-email";
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

function callbackSpotify(req, res) {
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
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
            },
            json: true,
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token,
                    refresh_token = body.refresh_token;

                Object.assign(tokenStorage, {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    accessTokenCreatedAt: Date.now(),
                    refreshTokenCreatedAt: Date.now(),
                });

                res.redirect('/');
            } else {
                res.redirect(
                    "/#" +
                    querystring.stringify({
                        error: "invalid_token",
                    })
                );
            }
        });
    }
}

function refreshToken(req, res) {
    const refresh_token = tokenStorage.refreshToken;
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token,
                refresh_token = body.refresh_token;
            res.send({
                access_token: access_token,
                refresh_token: refresh_token,
            });
        }
    });
}

function searchSpotify(req, res) {
    const searchQuery = req.params.query;
    const options = {
        url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        headers: {Authorization: "Bearer " + tokenStorage.accessToken},
        json: true,
    };

    request.get(options, function (error, response, body) {
        res.send(body);
    });
}

module.exports = {
    loginUser,
    callbackSpotify,
    refreshToken,
    searchSpotify,
};
