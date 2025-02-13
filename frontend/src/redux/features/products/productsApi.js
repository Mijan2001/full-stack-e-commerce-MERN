import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),

    tagTypes: ['Products'],

    endpoints: builder => ({
        fetchAllProducts: builder.query({
            query: ({
                category,
                color,
                minPrice,
                maxPrice,
                page = 1,
                limit = 8
            }) => {
                const queryParams = new URLSearchParams({
                    category: category !== 'all' ? category : '',
                    color: color !== 'all' ? color : '',
                    minPrice: isNaN(minPrice) ? '' : minPrice,
                    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
                    page: page.toString(),
                    limit: limit.toString()
                }).toString();

                return `/?${queryParams}`;
            },
            providesTags: ['Products']
        }),

        fetchProductById: builder.query({
            query: id => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }]
        }),

        addProduct: builder.mutation({
            query: newProduct => ({
                url: '/create-product',
                method: 'POST',
                body: newProduct,
                credentials: 'include'
            }),
            invalidatesTags: ['Products']
        }),

        fetchRelatedProducts: builder.query({
            query: id => `/related/${id}`,
            providesTags: ['Products']
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: 'include'
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Products', id }
            ]
        }),

        deleteProduct: builder.mutation({
            query: id => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }]
        })
    })
});

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useFetchRelatedProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApi;

export default productsApi;
