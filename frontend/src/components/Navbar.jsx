import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import CartModal from '../pages/shop/CartModal';
import { toast } from 'react-toastify';

const Navbar = () => {
    const products = useSelector(state => state.cart.products);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <header className="bg-gray-950 text-white font-semibold">
                <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:px-10 ">
                    {/* logo and nav icons for small devices */}
                    <div className="flex justify-between w-full md:hidden">
                        <NavLink
                            to="/"
                            className="text-black dark:text-white hover:text-gray-300"
                        >
                            Logo
                        </NavLink>
                        <div className="flex space-x-4">
                            <Link to="/search">
                                <i className="ri-search-line"></i>
                            </Link>
                            <button>
                                <i className="ri-shopping-cart-2-line"></i>
                                <sup>0</sup>
                            </button>
                            <Link to="/login">
                                <i className="ri-user-line"></i>
                            </Link>
                        </div>
                    </div>
                    {/* navigation links */}
                    <ul className="flex flex-wrap list-none m-0 p-0 space-x-4 order-2 md:order-1 md:flex-row md:space-x-4">
                        <li>
                            <NavLink
                                to="/"
                                className="text-black dark:text-white hover:text-gray-300"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/shop"
                                className="text-black dark:text-white hover:text-gray-300"
                            >
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className="text-black dark:text-white hover:text-gray-300"
                            >
                                Pages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className="text-black dark:text-white hover:text-gray-300"
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    {/* logo for medium and large devices */}
                    <div className="hidden md:block order-1 md:order-2">
                        <NavLink
                            to="/"
                            className="text-black dark:text-white hover:text-gray-300"
                        >
                            ECOMMERCE
                        </NavLink>
                    </div>
                    {/* nav icons for medium and large devices */}
                    <div className="hidden md:flex space-x-4 order-3">
                        <span>
                            <Link to="/search">
                                <i className="ri-search-line"></i>
                            </Link>
                        </span>

                        <span>
                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    products.length > 0
                                        ? handleCartToggle()
                                        : toast.error('Cart is empty', {
                                              position: 'top-right',
                                              autoClose: 1000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined
                                          });
                                }}
                            >
                                <i className="ri-shopping-cart-2-line"></i>
                                {products.length > 0 && (
                                    <sup className="bg-amber-400 px-1  border-amber-50  text-black rounded-full ">
                                        {products.length}
                                    </sup>
                                )}
                            </button>
                        </span>

                        <span>
                            <Link to="/login">
                                <i className="ri-user-line"></i>
                            </Link>
                        </span>
                    </div>
                </nav>

                {/* cart dropdown======================== */}
                {products && products.length > 0 && isCartOpen && (
                    <CartModal
                        products={products}
                        isOpen={isCartOpen}
                        onClose={handleCartToggle}
                    />
                )}
            </header>
        </>
    );
};

export default Navbar;
