const express = require('express');
const router = express.Router();
const cors = require('cors');

const cookieParser = require('cookie-parser');
const {
    loginUser,
    callbackSpotify,
    refreshToken,
    searchSpotify,
    recommendedGenres,
    newReleases
} = require('../controllers/spotifyController');

router.use(cors())
    .use(cookieParser());

// Login to Spotify with client id and secret
router.get('/login', loginUser)

// Callback from Spotify to request access and refresh tokens
router.get('/callback', callbackSpotify)

// Refresh the access token (PARTIALLY WORKING)
router.get('/refresh-token', refreshToken)

// Get Spotify search data
router.get('/search', searchSpotify)

// Get Spotify genres
router.get('/genres', recommendedGenres)

// Get Spotify new releases
router.get('/new-releases', newReleases)

module.exports = router;