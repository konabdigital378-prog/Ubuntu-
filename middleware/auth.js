const jwt = require('jsonwebtoken');

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;