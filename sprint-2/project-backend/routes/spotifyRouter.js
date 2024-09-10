const express = require('express');
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {
    loginUser,
    callbackSpotify,
    refreshToken
} = require('../controllers/spotifyController');

router.use(cors())
    .use(cookieParser());

// Login to Spotify with client id and secret
router.get('/login', loginUser)

// Callback from Spotify to request access and refresh tokens
router.get('/callback', callbackSpotify)

// Refresh the access token
router.get('/refresh-token', refreshToken)

// Get Spotify search data (NOT WORKING YET)
router.get("/search")

module.exports = router;