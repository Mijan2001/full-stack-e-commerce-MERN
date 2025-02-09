import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import HeroSection from './HeroSection';
import TrendingProducts from '../shop/TrendingProducts';

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <HeroSection />
            <TrendingProducts />
        </div>
    );
};

export default Home;
