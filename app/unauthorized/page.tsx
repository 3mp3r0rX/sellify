const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
      <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold animate-pulse hover:animate-bounce transition-transform duration-300 transform hover:scale-105">
        What are you doing here? YOU ARE NOT AN ADMIN!
      </h1>
    </div>
  );
};

export default Unauthorized;
