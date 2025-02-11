import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    removeFromCart,
    updateQuantity
} from '../../redux/features/cart/CartSlice';

const CartModal = ({ products, isOpen, onClose }) => {
    const dispatch = useDispatch();

    const handleQuantity = (type, id) => {
        const payload = { type, id };
        dispatch(updateQuantity(payload));
    };

    const handleRemove = id => {
        toast.error('Item removed from cart', {
            position: 'top-right'
        });
        dispatch(removeFromCart({ id }));
    };

    return (
        <div
            className={`absolute z-50 scroll-auto  top-20 md:top-16 right-0 w-full md:w-80 bg-white shadow-lg p-4 transition-opacity ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <h2 className="text-xl flex justify-between mb-5 font-semibold text-gray-800">
                <h4>Your cart</h4>
                <button onClick={onClose}>
                    <i className="ri-close-line text-gray-600 cursor-pointer text-2xl font-bold hover:bg-gray-950 hover:text-white"></i>
                </button>
            </h2>
            <ul className="space-y-2">
                {products.length > 0 &&
                    products.map((product, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center  bg-white rounded-md  transition-all duration-300 ease-in-out transform hover:shadow-lg"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 object-cover rounded-md"
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="text-sm font-semibold text-gray-800">
                                    {product.name}
                                </h3>
                                <p className="text-md text-gray-500">
                                    ${product.price}
                                </p>
                            </div>
                            <div className="flex items-center">
                                {/* increment to cart======================  */}
                                <button
                                    onClick={() =>
                                        handleQuantity('increment', product.id)
                                    }
                                    className="cursor-pointer flex justify-center items-center p-1 w-6 h-6 bg-green-300 rounded-full hover:bg-gray-300 transition duration-300"
                                >
                                    <i className="ri-add-line text-sm  text-gray-800"></i>
                                </button>
                                {/* product quantity======================  */}
                                <span className="mx-2 text-lg text-gray-800">
                                    {product.quantity}
                                </span>

                                {/* decrement to cart======================  */}
                                <button
                                    onClick={() =>
                                        handleQuantity('decrement', product.id)
                                    }
                                    className="cursor-pointer flex justify-center items-center p-1 w-6 h-6 bg-red-300 rounded-full hover:bg-gray-300 transition duration-300"
                                >
                                    <i className="ri-subtract-line text-gray-800"></i>
                                </button>
                            </div>
                            {/* remove from cart======================  */}
                            <button
                                onClick={() => handleRemove(product.id)}
                                className="cursor-pointer flex justify-center items-center  w-6 h-6 p-2 ml-4  text-white rounded-full hover:bg-red-200 transition duration-300"
                            >
                                <i className="ri-delete-bin-line text-red-700"></i>
                            </button>
                        </li>
                    ))}
            </ul>

            {/* calculation ===================== */}
            {products.length > 0 && <OrderSummary />}

            {/* <div className="flex justify-between items-center mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Total</h3>
                <p className="text-lg font-bold text-gray-900">
                    $
                    {products
                        .reduce(
                            (total, product) =>
                                total + product.price * product.quantity,
                            0
                        )
                        .toFixed(2)}
                </p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Link
                    to="/cart"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    View Cart
                </Link>
                <Link
                    to="/checkout"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    Checkout
                </Link>
            </div> */}
        </div>
    );
};

export default CartModal;
