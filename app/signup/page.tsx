'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';

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
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                
                <div className="w-full flex-1 mt-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <FontAwesomeIcon icon={faEnvelope} className="px-4 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <FontAwesomeIcon icon={faUser} className="px-4 text-gray-500" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <FontAwesomeIcon icon={faUser} className="px-4 text-gray-500" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <FontAwesomeIcon icon={faPhone} className="px-4 text-gray-500" />
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <FontAwesomeIcon icon={faLock} className="px-4 text-gray-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <FontAwesomeIcon icon={faLock} className="px-4 text-gray-500" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with social media
                  </div>
                </div>

                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4" />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853" />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04" />
                      <path
                        d="M272.1 0C145.7 0 43.2 52.6 28.9 150h90.4c20.9-64.3 81.8-112.3 152.8-112.3 36.7 0 68.3 9.5 92.6 26L453.8 0H272.1z"
                        fill="#ea4335" />
                    </svg>
                  </div>
                  <span className="ml-4">Sign up with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
