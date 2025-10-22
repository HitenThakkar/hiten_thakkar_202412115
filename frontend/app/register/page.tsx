'use client';

import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useRouter } from 'next/navigation';

export default function Register() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  // Add type to e for better TS support
    e.preventDefault();
    const form = e.currentTarget;  // Use e.currentTarget for clarity

    // Use namedItem for type-safe access
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value;

    try {
      await auth?.register(name, email, password, role);
      alert('Registered. Please login.');
      router.push('/login');
    } catch (e) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input name="name" placeholder="Name" className="border p-2 mb-2 w-full" required />
        <input name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 mb-2 w-full" required />
        <select name="role" className="border p-2 mb-2 w-full" required>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
}