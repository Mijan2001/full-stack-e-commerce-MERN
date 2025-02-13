import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import CartModal from '../pages/shop/CartModal';
import { toast } from 'react-toastify';
import avatarImg from '../assets/avatar.png';
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';

const Navbar = () => {
    const products = useSelector(state => state.cart.products);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    // show user if logged in ============================
    const dispatch = useDispatch();
    const { user } = useSelector(state => state?.auth);

    // logout user========================
    const [logoutUser] = useLogoutUserMutation();
    const handleLogout = async () => {
        try {
            toast.success('Logged out successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            await logoutUser().unwrap();

            dispatch(logout());

            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error('Failed to logout', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };

    // dropdown menu========================
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    // admin dropdown menus========================
    const adminDropdownMenus = () => [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Manage Items', path: '/dashboard/manage-products' },
        { label: 'All Orders', path: '/dashboard/manage-orders' },
        { label: 'Add New Post', path: '/dashboard/add-new-post' }
    ];

    // user dropdown menus============================
    const userDropdownMenus = () => [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Profile', path: '/dashboard/profile' },
        { label: 'Payment', path: '/dashboard/payments' },
        { label: 'Orders', path: '/dashboard/orders' }
    ];

    const dropdownMenus =
        user?.user?.role === 'admin'
            ? [...adminDropdownMenus()]
            : [...userDropdownMenus()];

    console.log('dropdownMenus : ', dropdownMenus);

    // Close dropdown when clicking outside
    const dropdownRef = useRef(null); // Reference for dropdown
    useEffect(() => {
        const handleClickOutside = event => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropDownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    <div className="hidden md:flex justify-center items-center space-x-4 order-3">
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
                                    <sup className="bg-amber-400 px-1  text-black rounded-full ">
                                        {products.length}
                                    </sup>
                                )}
                            </button>
                        </span>

                        <header className="bg-gray-950 text-white font-semibold">
                            <nav className="flex flex-col md:flex-row justify-between items-center">
                                {/* Navigation items */}
                                <div className="hidden md:flex space-x-4 order-3">
                                    {user ? (
                                        <div
                                            className="relative"
                                            ref={dropdownRef}
                                        >
                                            <img
                                                onClick={handleDropDownToggle}
                                                src={
                                                    user?.profileImage ||
                                                    avatarImg
                                                }
                                                alt="profile"
                                                className="size-6 rounded-full cursor-pointer"
                                            />
                                            {isDropDownOpen && (
                                                <div className="absolute  right-0 bg-gray-950 text-white w-40 shadow-md rounded-md p-2">
                                                    {dropdownMenus.map(
                                                        (menu, index) => (
                                                            <Link
                                                                onClick={() =>
                                                                    setIsDropDownOpen(
                                                                        false
                                                                    )
                                                                }
                                                                key={index}
                                                                to={menu.path}
                                                                className="block py-1 px-2 hover:bg-gray-800"
                                                            >
                                                                {menu.label}
                                                            </Link>
                                                        )
                                                    )}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block py-1 px-2 hover:bg-gray-800"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to="/login">
                                            <i className="ri-user-line"></i>
                                        </Link>
                                    )}
                                </div>
                            </nav>
                        </header>
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
