import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-teal-500 to-green-300">
      <div className="max-w-6xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-5xl mb-6">Sellify Marketplace, Coming Soon</h3>
          <h3 className="text-3xl mb-3">Download the Sellify App</h3>
          <p className="text-lg">Buy, Sell, and Stay Connected with Sellify.</p>
          <div className="flex justify-center my-10">
          <Link href={""}>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 w-52 mx-2 bg-white">
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
            <Link href={""}>
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 w-44 mx-2 bg-white">
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

        <nav className="text-center mb-10">
          <h6 className="text-2xl font-bold mb-4">Follow Us</h6>
          <div className="flex justify-center space-x-4">
            <a href="#" aria-label="Twitter">
              <FaTwitter className="text-white hover:text-sky-500" size={24} />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className="text-white hover:text-red-500" size={24} />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF className="text-white hover:text-blue-500" size={24} />
            </a>
          </div>
        </nav>
      </div>
      <div className="mt-16 mx-auto py-6 px-4 bg-gray-100 text-black">
  <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
    <p className="text-lg  order-2 md:order-1 mt-4 md:mt-0">
      &copy; {new Date().getFullYear()} Sellify - All rights reserved.
    </p>
    <div className="flex space-x-4 order-1 md:order-2 mt-4 md:mt-0">
      <a href="/about" className="hover:text-blue-600">About Us</a>
      <a href="/contact" className="border-l border-blue-300 pl-4 hover:text-blue-600">Contact Us</a>
      <a href="/privacy" className="border-l border-blue-300 pl-4 hover:text-blue-600">Privacy Policy</a>
    </div>
  </div>
</div>

    </footer>  
  );
};

export default Footer;
