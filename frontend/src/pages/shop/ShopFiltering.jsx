import React from 'react';

const ShopFiltering = ({
    filters,
    filtersState,
    setFiltersState,
    clearFilters
}) => {
    return (
        <div className="w-full flex justify-center md:justify-start flex-row md:flex-col md:w-1/6 gap-x-6 md:gap-0 md:p-2 bg-gray-100">
            <h4 className="hidden md:block text-lg font-semibold mb-4">
                Filters
            </h4>

            {/* categories */}
            <div className="mb-2 w-[33%] md:w-full">
                <h4 className="text-md text-center md:text-left font-semibold mb-2">
                    Category
                </h4>
                <hr className="mb-2" />
                {filters.categories.map(category => (
                    <label key={category} className="block">
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={filtersState.category === category}
                            onChange={e =>
                                setFiltersState({
                                    ...filtersState,
                                    category: e.target.value
                                })
                            }
                            className="mr-2"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* colors */}
            <div className="mb-2">
                <h4 className="text-md text-center md:text-left font-semibold mb-2">
                    Color
                </h4>
                <hr className="mb-2" />
                {filters.colors.map(color => (
                    <label key={color} className="block">
                        <input
                            type="radio"
                            name="color"
                            value={color}
                            checked={filtersState.color === color}
                            onChange={e =>
                                setFiltersState({
                                    ...filtersState,
                                    color: e.target.value
                                })
                            }
                            className="mr-2"
                        />
                        <span>{color}</span>
                    </label>
                ))}
            </div>

            {/* price range */}
            <div className="mb-2">
                <h4 className="text-md text-center md:text-left font-semibold mb-2">
                    Price Range
                </h4>
                <hr className="mb-2" />
                {filters.priceRanges.map(priceRange => (
                    <label key={priceRange.label} className="block">
                        <input
                            type="radio"
                            name="priceRange"
                            value={priceRange.label}
                            checked={
                                filtersState.priceRange === priceRange.label
                            }
                            onChange={e =>
                                setFiltersState({
                                    ...filtersState,
                                    priceRange: e.target.value
                                })
                            }
                            className="mr-2"
                        />
                        <span>{priceRange.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ShopFiltering;
