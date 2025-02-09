import React from 'react';

const RatingStars = ({ rating }) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <i
                key={i}
                className={`ri-star-fill cursor-pointer ${
                    i <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
            ></i>
        );
    }

    return (
        <div className="flex items-center space-x-[1px]">
            <span className="text-sm text-gray-600 ml-1">{stars}</span>
        </div>
    );
};

export default RatingStars;
