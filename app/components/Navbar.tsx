'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { useUser } from '../hooks/UserContext';
import CategoryPage from '../categories/page';
import ProfileDropdown from './ProfileDropdown';
import SearchComponent from './SearchComponent';
import { FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, setUserRole } = useUser();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'Post',
        credentials: 'include',
      });
      Cookies.remove('userSession');
      setUserRole('');
      
      toast.success('You have successfully logged out!');
      //window.location.href = '/login'; 
    } catch (error) {
      console.log(error)
      toast.error('Logout failed. Please try again.'); 
    }
  };

  return (
    <nav className="bg-gradient-to-br from-teal-500 to-green-300 shadow-md">
      <div className="container mx-auto px-4 py-9 flex justify-between items-center">

        <Link href="/" legacyBehavior>
          <a className="text-4xl font-bold text-white">Sellify</a>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-800 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
        
          {userRole ? (
            <>
              <ProfileDropdown />
              <button
                onClick={handleLogout}
                className="text-gray-900 font-semibold py-2 px-4 hover:text-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" legacyBehavior>
                <a className="text-white font-semibold py-2 px-4 hover:text-blue-700">
                  Sign Up
                </a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="text-white font-semibold py-2 px-4 hover:text-blue-700">
                  Sign In
                </a>
              </Link>
            </>
          )}
          {userRole.toLowerCase() === 'admin' && (
            <Link href="/admin" legacyBehavior>
              <a className="text-gray-900 font-semibold py-2 px-4 hover:text-blue-700">
                Dashboard
              </a>
            </Link>
          )}
         <Link href="/post-ad" legacyBehavior>
         <a className="text-blue-500 bg-white font-semibold rounded-xl py-2 px-4 hover:bg-blue-500 hover:text-white flex items-center">
         <FaPlus className="mr-2" /> 
           Post Ad
          </a>
           </Link>  

        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-600 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        <div id="mobile-menu" className="md:hidden bg-gray-100 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link href="/post-ad" legacyBehavior>
              <a className="text-gray-900 text-center block py-2 px-4 rounded-md hover:bg-gray-200">
                Post Ad
              </a>
            </Link>
            {userRole ? (
              <>
                <ProfileDropdown />
                <button
                  onClick={handleLogout}
                  className="text-gray-900 block py-2 px-4 rounded-md hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" legacyBehavior>
                  <a className="text-gray-900 block py-2 px-4 rounded-md hover:bg-gray-200">
                    Sign Up
                  </a>
                </Link>
                <Link href="/login" legacyBehavior>
                  <a className="text-gray-900 block py-2 px-4 rounded-md hover:bg-gray-200">
                    Sign In
                  </a>
                </Link>
              </>
            )}
            {userRole.toLowerCase() === 'admin' && (
              <Link href="/admin" legacyBehavior>
                <a className="text-gray-900 text-center font-semibold py-2 px-4 hover:text-blue-700">
                  Dashboard
                </a>
              </Link>
            )}
          </div>
        </div>
      </Transition>

      <div className="flex justify-center items-center py-4">
        <SearchComponent onSearch={undefined} />
      </div>
      <CategoryPage />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
    </nav>
  );
}
