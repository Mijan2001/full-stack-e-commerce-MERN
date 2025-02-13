const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        oldPrice: { type: Number },
        image: {
            type: String
        },
        color: {
            type: String
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
