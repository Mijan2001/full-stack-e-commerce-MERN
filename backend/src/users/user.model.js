const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    profileImage: String,
    bio: {
        type: String,
        maxLength: 200
    },
    profession: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// hashing password================
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

const user = new model('User', userSchema);
module.exports = user;

/*
1. userSchema.pre('save',{})
এই লাইনে pre মানে ডাটাবেজে পাসোয়ার্ড সেভ হওয়ার আগে এই ফাংশনটি কাজ করবে। অর্থাৎ পাসোয়ার্ড সেভ হওয়ার আগে এই ফাংশনটি কাজ করবে বএবং পাসোয়ার্ড হ্যাশ করবে।
*/
