import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import products from '../../../data/products.json';
import RatingStars from '../RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/CartSlice';
import { toast } from 'react-toastify';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { data, error, isLoading } = useFetchProductByIdQuery(id);
    const product = data?.product || {};
    const productReviews = product?.reviews || [];

    const handleAddToCart = product => {
        toast.success('Item added to cart', {
            position: 'top-right'
        });
        dispatch(addToCart(product));
    };

    // loading product ==============================
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-xl font-semibold text-blue-500">
                    Loading...
                </p>
            </div>
        );
    }

    // error fetching product=========================
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-red-500">
                    Failed to fetch product
                </p>
            </div>
        );
    }

    return (
        <div className="mt-5 flex flex-col mx-auto items-center md:mx-auto w-full">
            <section className="w-full h-[280px] flex flex-col items-center justify-center bg-gray-100 mt-5 mx-2 md:mx-10">
                <h2>Single Product Page</h2>
                <div className="flex flex-wrap justify-center">
                    <span className="mx-1">
                        <Link to="/">Home</Link>
                        <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="mx-1">
                        <Link to="/shop">Shop</Link>
                        <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="mx-1">{product?.name}</span>
                </div>
            </section>

            <section className="mt-5 w-full">
                <div className="grid w-full h-full grid-cols-1  md:grid-cols-2 gap-5 items-start">
                    <div className="flex justify-center">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-full h-96 object-cover rounded-md  shadow-lg"
                        />
                    </div>
                    <div className="card w-full h-full flex flex-col justify-between p-5 bg-white rounded-md shadow-lg">
                        <div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                                {product?.name}
                            </h3>
                            <p className="text-2xl font-bold text-gray-900 mb-4">
                                ${product?.price}
                            </p>
                            <p className="text-gray-500 text-base mb-4">
                                {product?.description}
                            </p>
                            <div className="mb-4">
                                <p className="text-lg">
                                    <strong>Category:</strong>{' '}
                                    {product?.category}
                                </p>
                                <p className="text-lg">
                                    <strong>Color:</strong> {product?.color}
                                </p>
                                <div className="flex items-center mt-2">
                                    <strong className="text-lg mr-2">
                                        Rating:
                                    </strong>
                                    {/* product rating========================== */}
                                    <RatingStars rating={product?.rating} />
                                    <span className="text-lg ml-2">
                                        ({product?.rating})
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* add to cart button===========================  */}
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>

            {/* review section================================  */}
            <ReviewsCard productReviews={productReviews} />
        </div>
    );
};

export default SingleProduct;
