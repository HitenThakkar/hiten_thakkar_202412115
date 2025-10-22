'use client';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Link from 'next/link';

export default function Header() {
  const auth = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">E-Commerce App</Link>
        </h1>
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-4 items-center">
            {auth?.user && (
              <>
                <li className="text-md pl-64">
                  <b>Welcome, {auth.user.name || 'User'}!</b>
                </li>
                <li>
                  <Link href="/products" className="hover:underline pl-64">
                    Products
                  </Link>
                </li>
                {auth.user.role === 'admin' && (
                  <li>
                    <Link href="/reports" className="hover:underline">
                      Reports
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => auth?.logout()}
                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!auth?.user && (
              <li className="flex space-x-2">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                <span>|</span>
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}