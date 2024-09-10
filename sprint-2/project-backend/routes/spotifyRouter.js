const express = require('express');
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {
    loginUser,
    requestTokens,
    refreshToken
} = require('../controllers/spotifyController');

router.use(cors())
    .use(cookieParser());

router.get('/login', loginUser)

router.get('/callback', requestTokens)

router.get('/refresh_token', refreshToken)


// Get Spotify search data
router.get("/search")

module.exports = router;