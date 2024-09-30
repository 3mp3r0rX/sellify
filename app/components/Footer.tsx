import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-500 to-green-300 text-white">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h3 className="text-6xl mb-4">Sellify Marketplace</h3>
          <h3 className="text-3xl mb-2">Download the Sellify App</h3>
          <p className="text-lg">Buy, Sell, and Stay Connected with Sellify.</p>
        </div>

        <div className="flex justify-center my-10">
          <Link href="">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 w-52 mx-2 bg-white shadow-md transition duration-300 transform hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
                alt="Google Play Store"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-600">Download on</p>
                <p className="text-sm md:text-base text-black">Google Play Store</p>
              </div>
            </div>
          </Link>
          <Link href="">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 w-44 mx-2 bg-white shadow-md transition duration-300 transform hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
                alt="Apple Store"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-600">Download on</p>
                <p className="text-sm md:text-base text-black">Apple Store</p>
              </div>
            </div>
          </Link>
        </div>

       
      </div>

      <div className="mt-8 py-3 px-4 bg-gray-100 text-black">
        <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
          <div className="w-full text-center order-2 md:order-1 mt-4 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
          <div>
            <h6 className="text-2xl font-bold mb-4">Explore</h6>
            <Link href="/about" className="block hover:text-blue-500">About Us</Link>
            <Link href="/contact" className="block hover:text-blue-500">Contact Us</Link>
            <Link href="/privacy" className="block hover:text-blue-500">Privacy Policy</Link>
          </div>
          <div>
            <h6 className="text-2xl font-bold mb-4">Follow Us</h6>
            <div className="flex justify-center space-x-4">
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-sky-500 transition duration-300 transform hover:scale-105" size={24} />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-red-500 transition duration-300 transform hover:scale-105" size={24} />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-blue-500 transition duration-300 transform hover:scale-105" size={24} />
              </a>
            </div>
          </div>
          <div>
            <h6 className="text-2xl font-bold mb-4">Get Help</h6>
            <Link href="/faq" className="block hover:text-blue-500">FAQs</Link>
            <Link href="/support" className="block hover:text-blue-500">Support</Link>
          </div>
        </div>
            
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Sellify - All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
