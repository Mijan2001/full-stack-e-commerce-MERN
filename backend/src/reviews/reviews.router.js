const express = require('express');
const Reviews = require('./reviews.model');
const router = express.Router();
const Products = require('../products/products.model');

// post a new review =========================
router.post('/post-review', async (req, res) => {
    try {
        const { comment, rating, userId, productId } = req.body;
        if (!comment || !rating || !userId || !productId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingReview = await Reviews.findOne({ userId, productId });
        if (existingReview) {
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            const newReview = new Reviews({
                comment,
                rating,
                userId,
                productId
            });
            await newReview.save();
        }

        // calculate average rating of product=======================
        const reviews = await Reviews.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce(
                (acc, review) => acc + review.rating,
                0
            );
            const averageRating = totalRating / reviews.length;
            const product = await Products.findById(productId);

            if (product) {
                product.rating = averageRating;
                await product.save({ validateBeforeSave: false });
            } else {
                return res.status(400).json({
                    message: 'Product not found',
                    reviews: reviews
                });
            }
        }

        res.status(201).json({ message: 'Review posted successfully' });
    } catch (err) {
        res.json({ message: err });
        res.status(500).send({ message: 'Failed to post review' });
    }
});

// total reviews count=========================
router.get('/total-reviews', async (req, res) => {
    try {
        const totalReviews = await Reviews.find().countDocuments();
        res.status(200).send({ totalReviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get total reviews' });
    }
});

// get reviews bu userId=========================
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User id is required' });
        }
        const reviews = await Reviews.find({ userId }).sort({ createdAt: -1 });
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }
        res.status(200).json({ reviews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get reviews' });
    }
});

module.exports = router;
