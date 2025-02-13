import React, { useEffect, useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity }
    ]
};

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);
    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    const {
        data: { products = [], totalPages, totalProducts } = {},
        error,
        isLoading
    } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage
    });

    // clear the filters
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
    };

    // if loading==========================
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-xl font-semibold text-blue-500">
                    Loading...
                </p>
            </div>
        );
    }
    // if error is occurred==========================
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline">{error.message}</span>
                </div>
            </div>
        );
    }

    // pagination=========================
    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <div className="my-10">
            <section className="p-5 w-full bg-gray-200 mb-5 mx-auto">
                <h2 className="text-center font-bold mb-5 text-2xl text-gray-800">
                    Shop Products
                </h2>
                <p className=" mb-10 md:px-20 lg:px-40 text-center text-lg text-gray-600">
                    Browse a diverse range of categories, from children's
                    dresses to versatile accessories. Elevate your style today!
                </p>
            </section>

            <section className="w-full flex justify-between">
                <div className="flex flex-col md:flex-row md:gap-x-2 w-full justify-center items-start">
                    {/* left side */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />

                    {/* right side */}
                    <div className="w-full md:w-[80%]">
                        <h3>
                            Showing {startProduct} - {endProduct} of{' '}
                            {totalProducts} products
                        </h3>
                        <ProductCards products={products} />

                        {/* pagination========================== */}
                        <div className="flex  justify-center items-center mt-5">
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    className={`px-3 py-1 rounded cursor-pointer ${
                                        currentPage === 1
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white'
                                    }`}
                                >
                                    Prev
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        className={`px-3 py-1 rounded cursor-pointer ${
                                            currentPage === index + 1
                                                ? 'bg-blue-700 text-white'
                                                : 'bg-blue-500 text-white'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    className={`px-3 py-1 rounded cursor-pointer ${
                                        currentPage === totalPages
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 text-white'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopPage;
