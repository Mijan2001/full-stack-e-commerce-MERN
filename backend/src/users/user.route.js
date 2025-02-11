const express = require('express');
const router = require('express').Router();
const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../middleware/generateToken');

// register user ===========================
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('username, email, password : ', username, email, password);
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // check if user already exists===================
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // create new user=================================
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error register error' });
    }
});

// login user ===========================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // check if user exists===================
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // check if password is correct===================
        // compare hashed password with user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // generate JWT token
        const token = await generateToken(user._id);

        // send token as cookie
        res.cookie('token', token);
        console.log('token : ', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                boi: user.boi,
                profession: user.profession
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// logout user ===========================
router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging out' });
    }
});

// delete user ===========================
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// get all users ===========================
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'id email role').sort({
            createdAt: -1
        });
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting all the users' });
    }
});

// update user role ===========================
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        } else {
            res.status(200).send({
                message: 'User role updated successfully',
                user
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user role' });
    }
});

// update user profile ===========================
router.patch('/edit-profile', async (req, res) => {
    try {
        const { userId, username, profileImage, bio, profession } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User not found' });
        }
        const user = await User.findById(userId);
        console.log('user : ', user);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // update profile==================
        if (username !== undefined) user.username = username;
        if (profileImage !== undefined) user.profileImage = profileImage;
        if (bio !== undefined) user.bio = bio;
        if (profession !== undefined) user.profession = profession;

        await user.save();
        res.status(200).json({
            message: 'User profile updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                boi: user.boi,
                profession: user.profession
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
});

module.exports = router;
