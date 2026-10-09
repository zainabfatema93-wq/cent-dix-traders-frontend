import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] pt-[100px] px-3 sm:px-5 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="w-full flex-1 pb-[120px]">
        <div className="w-full max-w-[700px] mx-auto mt-[50px] sm:mt-[80px]">
          <div className="w-full bg-white rounded-[15px] shadow-md p-[20px] sm:p-[30px] flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-[65px] h-[65px] sm:w-[70px] sm:h-[70px] bg-[#d8f6f9] rounded-full flex items-center justify-center">
              <span className="text-[32px] sm:text-[35px] text-black">✓</span>
            </div>

            {/* Heading */}
            <h1 className="text-[26px] sm:text-[35px] font-bold text-black mt-[20px] leading-tight">
              Order Placed Successfully!
            </h1>

            {/* Message */}
            <p className="text-[#233533] text-[15px] sm:text-[17px] mt-[10px]">
              Thank you for your order.
            </p>

            <p className="text-[#666] text-[14px] sm:text-[15px] mt-[5px]">
              Your order has been received successfully.
            </p>

            {/* Thank You Section */}
            <div className="w-full mt-[25px] sm:mt-[30px] border-t border-gray-200 pt-[20px] sm:pt-[25px]">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-black leading-tight">
                Thank You for Shopping with Cent-Dix Traders
              </h2>

              <p className="text-[#233533] text-[14px] sm:text-[16px] mt-[10px] leading-relaxed">
                We will process your order and contact you regarding delivery.
              </p>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-[12px] mt-[25px] sm:mt-[30px]">
              <button
                onClick={() => navigate("/Products")}
                className="w-full h-[48px] sm:h-[50px] bg-black text-white rounded-[10px] font-semibold hover:bg-[#233533] transition-all"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => navigate("/Home")}
                className="w-full h-[48px] sm:h-[50px] bg-[#d8f6f9] text-black border border-black rounded-[10px] font-semibold hover:bg-[#bcecef] transition-all"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-[calc(100%+24px)] sm:w-[calc(100%+40px)] -ml-[12px] sm:-ml-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default OrderConfirmation;
