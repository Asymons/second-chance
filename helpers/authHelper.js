const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const isUserAuthenticated = (req, res, next) => {

    const decoded = jwt.verify(req)

    if (req.user) {
        next();
    } else {
        res.send({
            message: 'You must login!'
        });
    }
};

const isUserAuthorized = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET || 'pass', (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.decoded = decoded.id;
        next();
    });
};


module.exports = {
    isUserAuthenticated,
    isUserAuthorized
};
