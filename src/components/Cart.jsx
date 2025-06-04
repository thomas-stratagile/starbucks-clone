import React from 'react';
import { useCart } from '../context/CartContext'; // Adjust path if necessary
import { Link } from 'react-router-dom'; // For a "Continue Shopping" link

const Cart = () => {
  const { cartItems, getCartTotal, getCartItemCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/" // Link to homepage or main product page
          className="bg-[#00754A] text-white font-semibold py-2 px-4 rounded-full hover:bg-[#005c3a] transition duration-150"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
            <div className="flex items-center">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
              )}
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">
                  Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">Qty: {item.quantity}</p>
              <p className="text-gray-700">
                Subtotal: ${(item.price && item.quantity) ? (item.price * item.quantity).toFixed(2) : 'N/A'}
              </p>
              {/* TODO: Add buttons to increase/decrease quantity or remove item */}
            </div>
          </div>
        ))}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Total Items:</p>
            <p className="text-xl font-bold">{getCartItemCount()}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-semibold">Grand Total:</p>
            <p className="text-xl font-bold">${getCartTotal().toFixed(2)}</p>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-[#00754A] text-white font-bold py-3 px-6 rounded-full w-full md:w-auto hover:bg-[#005c3a] transition duration-150">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
