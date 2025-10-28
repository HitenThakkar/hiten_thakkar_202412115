'use client';

import { useContext } from 'react';
import { CartContext } from '../../components/CartContext';
import { AuthContext } from '../../components/AuthContext';
import { apiFetch } from '../../lib/api';

export default function Cart() {
  const cart = useContext(CartContext);
  const auth = useContext(AuthContext);

  if (!auth?.user || auth.user.role !== 'customer') {
    return <div className="container mx-auto p-4">Please log in as a customer to view your cart.</div>;
  }

  if (!cart?.cart.length) {
    return <div className="container mx-auto p-4">Your cart is empty.</div>;
  }

  const handleCheckout = async () => {
    try {
      const order = await apiFetch('/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Only send items with productId and quantity
          items: cart.cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      alert(`Order placed successfully! Order ID: ${order.id}`);
      cart.clearCart();
    } catch (error) {
      alert('Checkout failed: ' + (error.message || 'Please try again.'));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.cart.map(item => (
        <div key={item.productId} className="border p-4 mb-2 flex justify-between items-center">
          <div>
            <h2 className="text-lg">{item.name}</h2>
            <p>Price: ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}
              className="bg-blue-500 text-white p-1"
            >
              +
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={e => cart.updateQuantity(item.productId, parseInt(e.target.value) || 1)}
              className="border p-1 w-16 text-center"
              min="1"
            />
            <button
              onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}
              className="bg-blue-500 text-white p-1"
            >
              -
            </button>
            <button
              onClick={() => cart.removeFromCart(item.productId)}
              className="bg-red-500 text-white p-1"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-xl">Total: ${cart.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white p-2 mt-2"
          disabled={!cart.cart.length}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}