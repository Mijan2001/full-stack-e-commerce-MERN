import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800  text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2">Company</h5>
                        <ul className="list-none">
                            <li className="mb-2">
                                <Link href="#" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="#" className="hover:underline">
                                    Careers
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="#" className="hover:underline">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2">Support</h5>
                        <ul className="list-none">
                            <li className="mb-2">
                                <Link href="#" className="hover:underline">
                                    Help Center
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="#" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="#" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h5 className="uppercase font-bold mb-2">Follow Us</h5>
                        <ul className="list-none flex space-x-4">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Instagram
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Your Company. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
