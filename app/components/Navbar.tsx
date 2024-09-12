import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">Sellify</Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/ads" className="text-white">Ads</Link>
          <Link href="/post-ad" className="text-white">Post Ad</Link>
          <Link href="/signup" className="text-white">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
