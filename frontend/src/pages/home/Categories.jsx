import React from 'react';

import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [
        { name: 'Accessories', path: 'accessories', image: category1 },
        { name: 'Dress Collecton', path: 'dress', image: category2 },
        { name: 'Jewellery', path: 'jewellery', image: category3 },
        { name: 'Cosmetics', path: 'cosmetics', image: category4 }
    ];

    return (
        <div className="grid grid-cols-1 mt-40 md:mt-10 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4">
            {categories.map(category => (
                <Link
                    to={`/categories/${category.path}`}
                    key={category.name}
                    className="block group"
                >
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h4 className="text-white text-lg font-semibold">
                                {category.name}
                            </h4>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
