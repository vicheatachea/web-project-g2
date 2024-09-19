const {tokenStorage} = require('../controllers/spotifyController');

function checkTokenValidity(req, res, next) {
    if (!tokenStorage.accessToken) {
        // Replace with res.status().json()
        return res.status(401).send('Access token is missing');
    }

    const accessTokenCreatedAt = tokenStorage.accessTokenCreatedAt;
    const timeDifference = Date.now() - accessTokenCreatedAt;
    const tokenValidity = 3600000; // 1 hour

    if (timeDifference > tokenValidity) {
        // Replace with res.status().json()
        return res.status(401).send('Access token has expired');
    } else if (timeDifference > 0.8 * tokenValidity) {
        res.setHeader('Warning', 'Access token is about to expire');
    }

    next();
}

module.exports = checkTokenValidity;