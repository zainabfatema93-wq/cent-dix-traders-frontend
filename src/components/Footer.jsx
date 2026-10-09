import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo cent dix trader.jpg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#111b1e] text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Company */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={Logo}
              alt="Cent Dix Traders Logo"
              className="w-[40px] h-[40px] object-contain shrink-0"
            />

            <h2 className="text-[18px] sm:text-[20px] font-bold">
              Cent-Dix Traders
            </h2>
          </div>

          <p className="text-gray-300 text-[13px] sm:text-[14px] leading-6">
            Your trusted partner for quality products and reliable trading
            solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full">
          <h3 className="text-[17px] sm:text-[18px] font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="flex flex-col gap-3 text-gray-300 text-[13px] sm:text-[14px]">
            <li
              onClick={() => navigate("/Home")}
              className="cursor-pointer hover:text-white"
            >
              Home
            </li>

            <li
              onClick={() => navigate("/Products")}
              className="cursor-pointer hover:text-white"
            >
              Products
            </li>

            <li
              onClick={() => navigate("/Cart")}
              className="cursor-pointer hover:text-white"
            >
              Cart
            </li>

            <li
              onClick={() => navigate("/Orders")}
              className="cursor-pointer hover:text-white"
            >
              Orders
            </li>
          </ul>
        </div>

        {/* Customer */}
        <div className="w-full">
          <h3 className="text-[17px] sm:text-[18px] font-semibold mb-4">
            Customer
          </h3>

          <ul className="flex flex-col gap-3 text-gray-300 text-[13px] sm:text-[14px]">
            <li
              onClick={() => navigate("/Profile")}
              className="cursor-pointer hover:text-white"
            >
              My Profile
            </li>

            <li
              onClick={() => navigate("/Checkout")}
              className="cursor-pointer hover:text-white"
            >
              Checkout
            </li>

            <li
              onClick={() => navigate("/Contact")}
              className="cursor-pointer hover:text-white"
            >
              Contact Us
            </li>

            <li
              onClick={() => navigate("/About")}
              className="cursor-pointer hover:text-white"
            >
              About Us
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full">
          <h3 className="text-[17px] sm:text-[18px] font-semibold mb-4">
            Contact
          </h3>

          <div className="text-gray-300 text-[13px] sm:text-[14px] leading-7 break-words">
            <p>Karachi, Pakistan</p>
            <p>Email: info@centdixtraders.com</p>
            <p>Phone: +92 300 0000000</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full max-w-[1200px] mx-auto border-t border-gray-700 mt-8 pt-5 text-center">
        <p className="text-gray-400 text-[12px] sm:text-[13px] leading-5">
          © 2026 Cent-Dix Traders. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
