const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const generateToken = async userId => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        return token;
    } catch (error) {
        console.error(error);
    }
};

module.exports = generateToken;
