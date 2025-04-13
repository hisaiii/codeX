import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import Footer from "../components/Footer";

export default function Home() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Hero/>
        <WhatWeDo />
        <Footer />
      </div>
    );
  }