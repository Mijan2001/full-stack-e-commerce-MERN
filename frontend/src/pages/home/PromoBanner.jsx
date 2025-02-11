import React from 'react';

const PromoBanner = () => {
    return (
        <section className="containe w-full mt-8  mx-auto">
            <section className="flex flex-col md:flex-row justify-around items-center py-10 bg-gray-100 px-10">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <span className="text-4xl text-blue-500 mb-2 block">
                        <i className="ri-truck-line"></i>
                    </span>
                    <h4 className="text-xl font-semibold mb-2">
                        Free Delivery
                    </h4>
                    <p className="text-gray-600">
                        Offers convenience and the ability to shop from
                        anywhere, anytime
                    </p>
                </div>
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <span className="text-4xl text-blue-500 mb-2 block">
                        <i className="ri-money-dollar-circle-line"></i>
                    </span>
                    <h4 className="text-xl font-semibold mb-2">
                        100% Money Back Guaranty
                    </h4>
                    <p className="text-gray-600">
                        Offers convenience and the ability to shop from
                        anywhere, anytime
                    </p>
                </div>
                <div className="text-center md:text-left">
                    <span className="text-4xl text-blue-500 mb-2 block">
                        <i className="ri-user-voice-fill"></i>
                    </span>
                    <h4 className="text-xl font-semibold mb-2">
                        Free Delivery
                    </h4>
                    <p className="text-gray-600">
                        Offers convenience and the ability to shop from
                        anywhere, anytime
                    </p>
                </div>
            </section>
        </section>
    );
};

export default PromoBanner;
