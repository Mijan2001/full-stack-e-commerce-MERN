import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import card1 from '../../assets/card-1.png';
import card2 from '../../assets/card-2.png';
import card3 from '../../assets/card-3.png';

const cards = [
    { id: 1, image: card1, trend: '2025 Trend', title: "Women's Shirt" },
    { id: 2, image: card2, trend: '2025 Trend', title: "Women's Dresses" },
    { id: 3, image: card3, trend: '2025 Trend', title: "Women's Casuals" }
];
const HeroSection = () => {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000, // Animation duration
            once: true // Animation will happen only once
        });
    }, []);
    return (
        <div className="mt-10">
            <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map(card => (
                    <div
                        key={card.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-500">
                                {card.trend}
                            </p>
                            <h4 className="text-lg font-semibold text-gray-800">
                                {card.title}
                            </h4>
                            <Link
                                to="/"
                                className="text-blue-500 hover:underline mt-2 block"
                            >
                                Discover More
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default HeroSection;
