const WhatWeDo = () => {
    return (
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center text-blue-600 mb-8">
            WHAT DO WE DO?
          </h2>
          
          <div className="mb-10 flex flex-col md:flex-row">
            <p className="text-gray-700 mb-4">
              India's roads—plagued by potholes, broken pavements, and waterlogging
              —pose serious hazards to commuters and pedestrians alike. 
              While municipal authorities are responsible for upkeep, a major 
              communication gap often dilutes or prevents action.
            </p>
            <div className="w-full max-w-sm mx-auto">
              <img 
                src="/api/placeholder/300/200" 
                alt="Car with pothole" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-blue-500 text-center font-medium mb-6">
              We bridge this gap
            </h3>
            
            <div className="mb-8">
              <div className="w-full max-w-sm mx-auto mb-4">
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Construction equipment" 
                  className="w-full h-auto rounded"
                />
              </div>
              <p className="text-gray-700">
                Our platform connects citizens with municipal bodies for quick, easy
                reporting. Using location tags and photos, with a community-
                driven approach, users can also view and upvote others' complaints,
                helping authorities identify and prioritize the most pressing issues.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-600">
                We bring transparency and collective voice into the system, making it
                easier to track progress, ensure accountability, and push for faster
                resolutions. Together, we're making roads better for cities more
                livable.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default WhatWeDo;