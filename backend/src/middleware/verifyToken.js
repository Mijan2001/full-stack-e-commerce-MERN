const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || {};
    // const token = req.headers['authorization'].split(' ')[1];

    console.log('token : ', token);
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        if (!verified) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        req.userId = verified.userId;
        req.role = verified.role;
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
