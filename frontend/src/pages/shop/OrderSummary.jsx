import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cart/CartSlice';
import { toast } from 'react-toastify';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const products = useSelector(store => store.cart.products);
    const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
        store => store.cart
    );

    const handleClearCart = () => {
        toast.error('Cart cleared', {
            position: 'top-right'
        });
        dispatch(clearCart());
    };

    return (
        <div className="text-black bg-white rounded-lg">
            <div>
                <h2 className="text-xl font-semibold mt-2 mb-4">
                    Order Summary
                </h2>
                <p className="mb-2">Selected Items: {selectedItems}</p>
                <p className="mb-2">Total Price: ${totalPrice.toFixed(2)}</p>
                <h3 className="text-lg font-medium mb-4">
                    Tax: ({(taxRate * 100).toFixed(2)}% : ${tax.toFixed(2)})
                </h3>
                <div className="flex justify-between">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            handleClearCart();
                        }}
                        className="flex cursor-pointer items-center px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        <span>Clear Cart</span>
                        <i className="ri-delete-bin-7-line ml-2"></i>
                    </button>
                    <button className="flex cursor-pointer items-center px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        <span>Checkout</span>
                        <i className="ri-bank-card-line ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
