'use client';

import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    try {
      await auth?.login(email, password);
      router.push('/products');
    } catch (e) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 mb-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}