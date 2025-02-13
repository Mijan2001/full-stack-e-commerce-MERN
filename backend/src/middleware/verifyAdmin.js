const verifyAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).send({
            success: false,
            message: 'Admin access only'
        });
    }
    next();
};

module.exports = verifyAdmin;
