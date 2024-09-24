'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from '../components/Loading';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const roleId = 1;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
    return () => setLoading(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: "Passwords don't match",
      });
      return;
    }

    const res = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        firstName, 
        lastName, 
        phoneNumber, 
        password, 
        roleId 
      }),
    });

    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Sign-up successful!',
      });
    } else {
      const errorData = await res.json();
      Swal.fire({
        icon: 'error',
        title: 'Failed to sign up',
        text: errorData.error || 'An error occurred',
      });
    }
  };

  return (
    <>
    {loading ? (
      <Loading />
    ) : ( 
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <table className="w-full">
            <tbody>
              {/* Email */}
              <tr>
                <td className="py-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your email"
                    required
                  />
                </td>
              </tr>
              {/* First Name */}
              <tr>
                <td className="py-2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your first name"
                    required
                  />
                </td>
              </tr>
              {/* Last Name */}
              <tr>
                <td className="py-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your last name"
                    required
                  />
                </td>
              </tr>
              {/* Phone Number */}
              <tr>
                <td className="py-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your phone number"
                    required
                  />
                </td>
              </tr>
              {/* Password */}
              <tr>
                <td className="py-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your password"
                    required
                  />
                </td>
              </tr>
              {/* Confirm Password */}
              <tr>
                <td className="py-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Confirm your password"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    )}
    </>
  );
}
