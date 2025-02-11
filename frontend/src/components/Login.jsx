import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const data = { email, password };
            const response = await loginUser(data).unwrap();
            const { user, token } = response;
            dispatch(setUser({ user }));
            toast.success(response.message, {
                position: 'top-right'
            });
            navigate('/');
        } catch (error) {
            toast.error('User does not exits,Please login first', {
                position: 'top-right'
            });
            navigate('/register');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-indigo-600 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
