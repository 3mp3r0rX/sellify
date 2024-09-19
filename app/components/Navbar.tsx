'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import {
  FaCar, FaHome, FaLaptop, FaCouch, FaTshirt, FaBriefcase, FaDog, FaWrench, FaHardHat, FaCamera, FaBaby,
  FaUtensils, FaLeaf, FaPlane, FaPalette, FaMusic, FaMotorcycle, FaHeartbeat, FaPuzzlePiece, FaFootballBall, FaBook
} from 'react-icons/fa'; 
import CategoriesList from './CategoriesList ';

const categories = [
  { name: 'Cars', href: '/category/cars', icon: <FaCar /> },
  { name: 'Real Estate', href: '/category/real-estate', icon: <FaHome /> },
  { name: 'Electronics', href: '/category/electronics', icon: <FaLaptop /> },
  { name: 'Furniture', href: '/category/furniture', icon: <FaCouch /> },
  { name: 'Fashion', href: '/category/fashion', icon: <FaTshirt /> },
  { name: 'Services', href: '/category/services', icon: <FaWrench /> },
  { name: 'Jobs', href: '/category/jobs', icon: <FaBriefcase /> },
  { name: 'Pets', href: '/category/pets', icon: <FaDog /> },
  { name: 'Books', href: '/category/books', icon: <FaBook /> },
  { name: 'Sports', href: '/category/sports', icon: <FaFootballBall /> }, 
  { name: 'Toys', href: '/category/toys', icon: <FaPuzzlePiece /> },
  { name: 'Motorcycles', href: '/category/motorcycles', icon: <FaMotorcycle /> }, 
  { name: 'Health & Beauty', href: '/category/health-beauty', icon: <FaHeartbeat /> },
  { name: 'Music', href: '/category/music', icon: <FaMusic /> },
  { name: 'Art', href: '/category/art', icon: <FaPalette /> },
  { name: 'Travel', href: '/category/travel', icon: <FaPlane /> },
  { name: 'Garden', href: '/category/garden', icon: <FaLeaf /> },
  { name: 'Food & Drink', href: '/category/food-drink', icon: <FaUtensils /> }, 
  { name: 'Babies & Kids', href: '/category/babies-kids', icon: <FaBaby /> },   
  { name: 'Photography', href: '/category/photography', icon: <FaCamera /> },   
  { name: 'Construction', href: '/category/construction', icon: <FaHardHat /> }, 

];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-gray-800">Sellify</a>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-800 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
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

        <div className="hidden md:flex space-x-4">
          <Link href="/post-ad" legacyBehavior>
            <a className="text-gray-800 font-semibold py-2 px-4 hover:text-blue-600">Post Ad</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="text-gray-800 font-semibold py-2 px-4 hover:text-blue-600">Sign Up</a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a className="text-gray-800 font-semibold py-2 px-4 hover:text-blue-600">Sign In</a>
          </Link>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        <div id="mobile-menu" className="md:hidden bg-gray-100 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link href="/post-ad" legacyBehavior>
              <a className="text-gray-800 block py-2 px-4 rounded-md hover:bg-gray-200">Post Ad</a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a className="text-gray-800 block py-2 px-4 rounded-md hover:bg-gray-200">Sign Up</a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="text-gray-800 block py-2 px-4 rounded-md hover:bg-gray-200">Sign In</a>
            </Link>
          </div>
        </div>
      </Transition>

      <CategoriesList />
    </nav>
  );
}
