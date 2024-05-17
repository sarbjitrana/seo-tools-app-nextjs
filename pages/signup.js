// pages/signup.js
import React, { useState } from 'react';
import Link from 'next/link';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Call your signup API here and handle user registration
    console.log(`Signing up with name: ${name}, email: ${email}, password: ${password}`);
    // You can use axios or fetch to make API requests
    // Example using fetch:
    /*
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    // Handle registration result
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
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
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login">
            <a className="text-blue-500">Login</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
