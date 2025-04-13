const Hero = () => {
    return (
      <section className="bg-blue-100 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full max-w-md mb-6">
            <img 
              src="/api/placeholder/400/300" 
              alt="Road workers fixing roads" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              A SAFE, RELIABLE, AND CONVENIENT WAY TO GET YOUR ROADS FIXED
            </h2>
            <div className="flex flex-col gap-2 w-full max-w-xs mx-auto">
              <button className="bg-blue-500 text-white py-2 px-4 rounded font-medium">
                Sign Up
              </button>
              <button className="bg-white text-blue-500 border border-blue-200 py-2 px-4 rounded font-medium">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Hero;