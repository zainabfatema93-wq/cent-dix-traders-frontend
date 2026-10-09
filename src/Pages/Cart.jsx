import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartStore } from "../Store/cartStore";

const Cart = () => {
  const navigate = useNavigate();

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] pt-[100px] px-3 sm:px-5 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="w-full flex-1 pb-[120px]">
        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center mb-[25px] sm:mb-[30px]">
          <h1 className="text-[28px] sm:text-[35px] font-bold text-black text-center">
            Your Cart
          </h1>

          <p className="text-[#233533] mt-2 text-center text-[14px] sm:text-[16px]">
            Review your selected products
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="w-full flex flex-col items-center justify-center mt-[50px] sm:mt-[60px]">
            <h2 className="text-[23px] sm:text-[25px] font-bold text-black text-center">
              Your Cart is Empty
            </h2>

            <p className="text-[#555] mt-2 text-center text-[14px] sm:text-[16px]">
              Add some products to your cart first.
            </p>

            <button
              onClick={() => navigate("/Products")}
              className="w-[190px] sm:w-[200px] h-[48px] sm:h-[50px] bg-black text-white rounded-[10px] mt-[25px] hover:bg-[#233533] transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Cart Items */
          <div className="w-full max-w-[1100px] mx-auto">
            <div className="w-full flex flex-col gap-[20px]">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="w-full bg-white rounded-[15px] shadow-md p-[15px] sm:p-[20px] flex flex-col md:flex-row items-center gap-[20px]"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-[180px] h-[180px] bg-[#d8f6f9] rounded-[10px] flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="w-full flex-1 text-center md:text-left">
                    <p className="text-[#666] text-[14px]">{item.category}</p>

                    <h2 className="text-[20px] sm:text-[22px] font-bold text-black mt-1 break-words">
                      {item.name}
                    </h2>

                    <p className="text-[19px] sm:text-[20px] font-bold text-[#233533] mt-2">
                      Rs. {item.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center justify-center md:justify-start gap-[10px] mt-[15px] flex-wrap">
                      <p className="font-semibold text-black">Quantity:</p>

                      <div className="flex items-center border border-gray-400 rounded-[8px] overflow-hidden">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className="w-[38px] h-[38px] bg-[#233533] text-white text-[20px] hover:bg-black transition-all"
                        >
                          -
                        </button>

                        <span className="w-[45px] h-[38px] flex items-center justify-center text-black font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className="w-[38px] h-[38px] bg-[#233533] text-white text-[20px] hover:bg-black transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-full md:w-[120px] h-[45px] bg-black text-white rounded-[8px] hover:bg-[#233533] transition-all shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Total */}
            <div className="w-full bg-white rounded-[15px] shadow-md mt-[25px] p-[20px] sm:p-[25px]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px]">
                <h2 className="text-[21px] sm:text-[22px] font-bold text-black">
                  Total
                </h2>

                <p className="text-[23px] sm:text-[25px] font-bold text-[#233533]">
                  Rs. {total}
                </p>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate("/Products")}
                className="w-full h-[48px] sm:h-[50px] bg-[#d8f6f9] text-black border border-black rounded-[10px] mt-[20px] font-semibold hover:bg-[#bcecef] transition-all"
              >
                Continue Shopping
              </button>

              {/* Checkout */}
              <button
                onClick={() => navigate("/Checkout")}
                className="w-full h-[48px] sm:h-[50px] bg-black text-white rounded-[10px] mt-[12px] font-semibold hover:bg-[#233533] transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-[calc(100%+24px)] sm:w-[calc(100%+40px)] -ml-[12px] sm:-ml-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
