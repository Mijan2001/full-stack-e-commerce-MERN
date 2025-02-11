import React, { useState } from 'react';
import ProductCards from './ProductCards';
import products from '../../data/products.json';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-4">
                    Trending Products
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the Hottest Picks: Elevate Your Style with Our
                    Curated Collection of Trending Women's Fashion Products
                </p>
                <ProductCards products={products.slice(0, visibleProducts)} />

                {/* load more product button =========================  */}
                <div className="flex justify-center mt-8">
                    {visibleProducts < products.length && (
                        <button
                            onClick={loadMoreProducts}
                            className="bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Load More Products
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
