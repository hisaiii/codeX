import React from 'react';
import img1 from "../images/secondimg.jpg";
import img2 from "../images/thirdimg.jpg"
const WhatWeDo = () => {
  return (
    <section className="px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading (First code's styling) */}
        <h2 className="text-2xl font-bold text-blue-600 mb-10 tracking-wide">
          WHAT DO WE DO?
        </h2>

        {/* Section 1: Problem Description (First code's layout) */}
        <div className="mb-16 flex flex-col md:flex-row items-center text-left">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <p className="text-gray-700 text-lg leading-relaxed">
              India's roads—plagued by potholes, broken pavements, and waterlogging—pose serious
              challenges to commuters and pedestrians alike. While municipal authorities are responsible
              for upkeep, a major communication gap often delays or prevents action.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={img1}
              alt="Car with pothole"
              className="w-full h-64 object-cover rounded shadow-lg"
            />
          </div>
        </div>

        {/* Highlighted Subheading (First code's styling) */}
        <h3 className="text-2xl font-semibold text-white bg-blue-600 inline-block px-6 py-2 rounded-full shadow-md mb-10">
          We bridge this gap.
        </h3>

        {/* Section 2: Platform Usage (First code's layout) */}
        <div className="mb-16 flex flex-col md:flex-row items-center text-left">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0 order-1 md:order-none">
            <img
              src={img2}
              alt="Construction equipment"
              className="w-full h-64 object-cover rounded shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-700 text-lg leading-relaxed">
              Our platform connects citizens with municipal bodies for quick, easy reporting
              of damaged road infrastructure using location tags and photos. With a community-driven
              approach, users can also view and upvote others' complaints, helping authorities
              identify and prioritize the most pressing issues.
            </p>
          </div>
        </div>

        {/* Section 3: Transparency Statement (First code's styling) */}
        <div className="flex justify-center py-10 w-full px-0">
          <div className="bg-blue-200 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm max-w-3xl w-full text-center">
            <p className="text-blue-700 text-lg leading-relaxed">
              We bring transparency and collective voice into the system, making it easier to
              track progress, ensure accountability, and push for faster resolutions. Together,
              we're making roads safer and cities more responsive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;