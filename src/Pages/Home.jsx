import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Hero from "../components/Hero";

export const Home = () => {
  const heroData = [
    {
      text1: "Welcome to Cent-Dix Traders",
      text2: "Your trusted partner in trading.",
    },
    {
      text1: "Explore Our Services",
      text2: "Discover the best trading solutions for your needs.",
    },
    {
      text1: "Join Our Community",
      text2: "Connect with like-minded traders and grow together.",
    },
    {
      text1: "Stay Informed",
      text2: "Get the latest market insights and updates.",
    },
  ];

  const [heroCount, setHeroCount] = React.useState(0);

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Navbar />

      {/* LEFT TEXT + RIGHT IMAGE ON ALL DEVICES */}
      <div className="w-full h-full flex flex-row">
        {/* TEXT - LEFT 50% */}
        <div className="w-1/2 h-full min-w-0">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>

        {/* IMAGE - RIGHT 50% */}
        <div className="w-1/2 h-full min-w-0">
          <Background heroCount={heroCount} />
        </div>
      </div>
    </div>
  );
};

export default Home;
