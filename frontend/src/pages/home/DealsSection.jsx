import React from 'react';
import dealsImg from '../../assets/deals.png';

const DealsSection = () => {
    return (
        <section className="flex  flex-col md:flex-row md:h-[400px]  items-center justify-between gap-8 md:gap-16 py-16  bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <div className="w-full md:w-1/2">
                <img src={dealsImg} alt="deals image" className="" />
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
                <h5 className="font-bold text-lg">Up to 20% Discount</h5>
                <h4 className="font-bold text-3xl mt-2">Deals of this month</h4>
                <p className="text-sm mt-4 pr-5 md:mt-6 font-semibold text-justify">
                    Our Women's fashion deals of the month are here to make your
                    style dreams a reality without breaking the bank. Discover a
                    curated collection of exquisite clothing, accessories, and
                    footwear, all handpicked to elevate your wardrobe.
                </p>
                <div className="flex justify-center md:justify-start gap-4 mt-8">
                    <div className="bg-white text-black flex flex-col justify-center items-center w-[60px] h-[60px] p-4 rounded-full shadow-lg">
                        <h4 className="font-bold text-center">14</h4>
                        <p className="text-sm font-semibold">days</p>
                    </div>
                    <div className="bg-white text-black flex flex-col justify-center items-center w-[60px] h-[60px] p-4 rounded-full shadow-lg">
                        <h4 className="font-bold text-center">20</h4>
                        <p className=" text-sm font-semibold">Hours</p>
                    </div>
                    <div className="bg-white text-black flex flex-col justify-center items-center w-[60px] h-[60px] p-4 rounded-full shadow-lg">
                        <h4 className="font-bold text-center">15</h4>
                        <p className=" text-sm font-semibold">Minutes</p>
                    </div>
                    <div className="bg-white text-black flex flex-col justify-center items-center w-[60px] h-[60px] p-4 rounded-full shadow-lg">
                        <h4 className="font-bold text-center">05</h4>
                        <p className=" text-sm font-semibold">Seconds</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
