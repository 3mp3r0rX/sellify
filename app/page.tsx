export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold text-gray-900">Welcome to Sellify</h1>
      <p className="mt-3 text-2xl text-gray-700">Buy and Sell Anything, Anytime.</p>
      <div className="mt-6">
        <button className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Post Your Ad
        </button>
      </div>
    </main>
  );
}
