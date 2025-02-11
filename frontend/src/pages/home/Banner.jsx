import React from 'react';
import bannerImg from '../../assets/header.png';

const Banner = () => {
    return (
        <div className="carousel-container max-h-[600px]  py-5  ">
            <div className="carousel-item flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 rounded-sm ">
                <div className="text-center md:text-left md:w-1/2">
                    <h4 className="text-lg font-semibold text-gray-700">
                        UP to 20% Discount on
                    </h4>
                    <h1 className="text-4xl font-bold text-gray-900 my-2">
                        Girl's Fashion
                    </h1>
                    <p className="text-gray-600 my-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec dictum nunc nec lobortis. Lorem, ipsum dolor sit
                        amet consectetur adipisicing elit. Libero eos veritatis
                        ipsam aliquid quo nihil error beatae ducimus ut
                        similique, itaque, maxime minima repudiandae doloribus
                        illo molestias impedit obcaecati quas!
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        EXPLORE NOW
                    </button>
                </div>
                <div className="mt-6 md:mt-0 h-[350px] w-full md:w-1/2">
                    <img
                        src={bannerImg}
                        alt="banner"
                        className="w-full h-full rounded-lg "
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
