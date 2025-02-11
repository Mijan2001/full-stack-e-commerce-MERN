import React, { useEffect, useState } from 'react';
import products from '../../data/products.json';
import ProductCards from '../shop/ProductCards';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { categoryName } = useParams();

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filteredProducts = products.filter(
            product =>
                product.category.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filteredProducts);
    }, [categoryName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="space-x-10  mt-5 ">
            <div className="p-5 w-full bg-gray-200 mb-5 mx-auto">
                <h2 className="text-center font-bold mb-5 text-4xl text-gray-800">
                    {categoryName}
                </h2>
                <p className=" mb-10 md:px-20 lg:px-40 text-center text-lg text-gray-600">
                    Browse a diverse range of categories, from children's
                    dresses to versatile accessories. Elevate your style today!
                </p>
            </div>
            <div>
                <ProductCards products={filteredProducts} />
            </div>
        </section>
    );
};

export default CategoryPage;
