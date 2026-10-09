import React from "react";
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full h-full bg-gradient-to-r from-[#151414] to-[#0c2025] flex flex-col justify-center px-3 sm:px-5 md:px-8 lg:px-14 overflow-hidden">
      {/* Hero Text */}
      <div className="w-full text-white">
        <p className="text-[14px] sm:text-[22px] md:text-[38px] lg:text-[55px] font-semibold leading-tight break-words">
          {heroData.text1}
        </p>

        <p className="mt-3 sm:mt-4 text-[10px] sm:text-[15px] md:text-[20px] lg:text-[30px] leading-relaxed break-words">
          {heroData.text2}
        </p>
      </div>

      {/* Slider Dots */}
      <div className="flex items-center gap-2 sm:gap-3 mt-5 sm:mt-7">
        <FaCircle
          className={`w-[7px] h-[7px] sm:w-[11px] sm:h-[11px] md:w-[14px] md:h-[14px] cursor-pointer ${
            heroCount === 0 ? "fill-orange-400" : "fill-gray-400"
          }`}
          onClick={() => setHeroCount(0)}
        />

        <FaCircle
          className={`w-[7px] h-[7px] sm:w-[11px] sm:h-[11px] md:w-[14px] md:h-[14px] cursor-pointer ${
            heroCount === 1 ? "fill-orange-400" : "fill-gray-400"
          }`}
          onClick={() => setHeroCount(1)}
        />

        <FaCircle
          className={`w-[7px] h-[7px] sm:w-[11px] sm:h-[11px] md:w-[14px] md:h-[14px] cursor-pointer ${
            heroCount === 2 ? "fill-orange-400" : "fill-gray-400"
          }`}
          onClick={() => setHeroCount(2)}
        />

        <FaCircle
          className={`w-[7px] h-[7px] sm:w-[11px] sm:h-[11px] md:w-[14px] md:h-[14px] cursor-pointer ${
            heroCount === 3 ? "fill-orange-400" : "fill-gray-400"
          }`}
          onClick={() => setHeroCount(3)}
        />
      </div>
    </div>
  );
};

export default Hero;
