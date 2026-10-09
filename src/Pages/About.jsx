import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-[#ecfafa] flex flex-col">
      <Navbar />

      <main className="w-full flex-1 pt-[100px] pb-[120px] px-3 sm:px-5">
        <div className="w-full max-w-[900px] mx-auto">
          <div className="w-full flex flex-col items-center text-center mb-[30px]">
            <h1 className="text-[30px] sm:text-[35px] font-bold text-black">
              About Us
            </h1>

            <p className="text-[#233533] mt-2">
              Learn more about Cent-Dix Traders
            </p>
          </div>

          <div className="w-full bg-white rounded-[15px] shadow-md p-[25px] sm:p-[35px]">
            <h2 className="text-[24px] font-bold text-black">
              Welcome to Cent-Dix Traders
            </h2>

            <p className="text-[#555] leading-7 mt-[15px]">
              Cent-Dix Traders is a trading platform focused on providing
              quality products and reliable services to our customers.
            </p>

            <p className="text-[#555] leading-7 mt-[15px]">
              Our goal is to provide a simple and convenient shopping experience
              for our customers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
