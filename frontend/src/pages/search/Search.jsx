import React, { useEffect, useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from '../shop/ProductCards';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filteredProducts = productsData.filter(
            product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
        );
        setFilteredProducts(filteredProducts);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    return (
        <div className="my-10 ">
            <section className="p-5 w-full bg-gray-200 mb-5 mx-auto">
                <h2 className="text-center font-bold mb-5 text-2xl text-gray-800">
                    Search Products
                </h2>
                <p className=" mb-10 md:px-20 lg:px-40 text-center text-lg text-gray-600">
                    Browse a diverse range of categories, from children's
                    dresses to versatile accessories. Elevate your style today!
                </p>
            </section>

            <section className="mb-5 ">
                <div className="flex justify-center items-center">
                    <input
                        type="text"
                        className="p-3 w-full md:w-1/2 border border-gray-300 rounded-l-md"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={() => setSearchQuery(event.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-3 rounded-r-md"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </section>

            <ProductCards products={filteredProducts} />
        </div>
    );
};

export default Search;
