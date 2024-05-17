// pages/login.js
import React, { useState } from 'react';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Call your login API here and handle authentication
    console.log(`Logging in with email: ${email}, password: ${password}`);
    // You can use axios or fetch to make API requests
    // Example using fetch:
    /*
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    // Handle authentication result
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register">
            <a className="text-blue-500">Register</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
