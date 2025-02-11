import React, { useEffect, useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';

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
    const [products, setProducts] = useState(productsData);
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    const applyFilters = () => {
        let filteredProducts = productsData;

        // filter by category
        if (filtersState.category && filtersState.category !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.category === filtersState.category
            );
        }

        // filter by color
        if (filtersState.color && filtersState.color !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.color === filtersState.color
            );
        }

        // filter by price range
        if (filtersState.priceRange) {
            const { min, max } = filters.priceRanges.find(
                range => range.label === filtersState.priceRange
            );

            filteredProducts = filteredProducts.filter(
                product => product.price >= min && product.price <= max
            );
        }

        setProducts(filteredProducts);
    };

    useEffect(() => {
        applyFilters();
    }, [filtersState]);

    // clear the filters
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
    };

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
                        <h3>Products Available {products.length}</h3>
                        <ProductCards products={products} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShopPage;
