import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/CartSlice';
import { toast } from 'react-toastify';

const ProductCards = ({ products }) => {
    const dispatch = useDispatch();
    const handleAddToCart = product => {
        toast.success('Item added to cart', {
            position: 'top-right'
        });
        dispatch(addToCart(product));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="bg-white   rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform"
                >
                    <div className="block">
                        <Link to={`/shop/${product._id}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-t-md mb-4 transition-all duration-300 ease-in-out transform"
                            />
                        </Link>

                        <div className="flex p-2 flex-col">
                            <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">
                                {product.description}
                            </p>
                            <div className="flex justify-between items-center ">
                                <p className="text-xl font-bold text-gray-900 mt-2">
                                    ${product.price}
                                </p>
                                {/* Improved rating design */}
                                <RatingStars rating={product.rating} />
                            </div>
                        </div>
                    </div>
                    {/* cart icons ======================  */}
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            handleAddToCart(product);
                        }}
                        className="absolute top-2 right-2 text-black px-3 py-1 rounded-md hover:bg-gray-200 hover:text-black transition-colors duration-300 cursor-pointer"
                    >
                        <i className="ri-shopping-cart-2-line font-bold text-xl"></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;
