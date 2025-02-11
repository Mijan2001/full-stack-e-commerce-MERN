import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const handleRegister = async e => {
        e.preventDefault();
        try {
            const data = { username, email, password };
            console.log('data : ', data);
            console.log(' registerUser : ', registerUser);
            await registerUser(data).unwrap();
            toast.success('Register Successfully', {
                position: 'top-right'
            });
            navigate('/login');
        } catch (error) {
            console.error('error : ', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold text-center">Register</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                username
                            </label>
                            <input
                                type="text"
                                id="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>
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
                            Register
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            You have have already an account?{' '}
                            <Link
                                to="/login"
                                className="text-indigo-600 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
