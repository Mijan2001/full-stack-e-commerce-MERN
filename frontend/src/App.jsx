import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
const App = () => {
    return (
        <>
            <ToastContainer />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow mx-2">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default App;
