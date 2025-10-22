'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '../../lib/api';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await apiFetch('/orders');
        setOrders(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Orders</h1>
      <ul>
        {orders.map(o => (
          <li key={o.id} className="border p-2 mb-2">
            Order #{o.id} - Total: ${o.total} - Date: {new Date(o.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}