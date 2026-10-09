import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartStore } from "../Store/cartStore";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const navigate = useNavigate();

  const { cart, clearCart } = useCartStore();
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/Cart", { replace: true });
    }
  }, [cart, navigate]);

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    setError("");

    console.log("Place Order clicked");
    console.log("Customer Information:", formData);
    console.log("Payment Method:", paymentMethod);
    console.log("Order:", cart);

    // Clear cart after placing order
    clearCart();

    navigate("/OrderConfirmation");
  };

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#ecfafa] pt-[100px] px-3 sm:px-5 flex flex-col">
        <Navbar />
        <div className="w-full flex-1 pb-[40px]">
          <div className="w-full flex flex-col items-center justify-center mt-[60px] sm:mt-[80px]">
            <h1 className="text-[26px] sm:text-[30px] font-bold text-black text-center">
              Your Cart is Empty
            </h1>

            <p className="text-[#555] text-[14px] sm:text-[16px] mt-2 text-center">
              Add some products before going to checkout.
            </p>

            <button
              onClick={() => navigate("/Products")}
              className="w-[190px] sm:w-[200px] h-[48px] sm:h-[50px] bg-black text-white rounded-[10px] mt-[25px] hover:bg-[#233533] transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="w-[calc(100%+24px)] sm:w-[calc(100%+40px)] -ml-[12px] sm:-ml-[20px]">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] pt-[100px] px-3 sm:px-5 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="w-full flex-1 pb-[40px]">
        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center mb-[25px] sm:mb-[30px]">
          <h1 className="text-[28px] sm:text-[35px] font-bold text-black text-center">
            Checkout
          </h1>

          <p className="text-[#233533] mt-2 text-center text-[14px] sm:text-[16px]">
            Complete your order
          </p>
        </div>

        {/* Checkout Sections */}
        <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-[20px] sm:gap-[25px]">
          {/* Customer Information */}
          <div className="w-full lg:w-1/2 bg-white rounded-[15px] shadow-md p-[20px] sm:p-[25px]">
            <h2 className="text-[21px] sm:text-[23px] font-bold text-black">
              Customer Information
            </h2>

            {/* Full Name */}
            <div className="mt-[20px]">
              <label className="block text-black font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full h-[48px] sm:h-[50px] border border-gray-300 rounded-[8px] px-[15px] text-[14px] sm:text-[16px] outline-none focus:border-black"
              />
            </div>

            {/* Email */}
            <div className="mt-[15px]">
              <label className="block text-black font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-[48px] sm:h-[50px] border border-gray-300 rounded-[8px] px-[15px] text-[14px] sm:text-[16px] outline-none focus:border-black"
              />
            </div>

            {/* Phone */}
            <div className="mt-[15px]">
              <label className="block text-black font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full h-[48px] sm:h-[50px] border border-gray-300 rounded-[8px] px-[15px] text-[14px] sm:text-[16px] outline-none focus:border-black"
              />
            </div>

            {/* Address */}
            <div className="mt-[15px]">
              <label className="block text-black font-semibold mb-2">
                Delivery Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete delivery address"
                className="w-full h-[100px] border border-gray-300 rounded-[8px] px-[15px] py-[12px] text-[14px] sm:text-[16px] outline-none resize-none focus:border-black"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/2 bg-white rounded-[15px] shadow-md p-[20px] sm:p-[25px]">
            <h2 className="text-[21px] sm:text-[23px] font-bold text-black">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="mt-[20px] flex flex-col gap-[15px]">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-start justify-between gap-[15px] border-b border-gray-200 pb-[15px]"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-black text-[15px] sm:text-[16px] break-words">
                      {item.name}
                    </h3>

                    <p className="text-[#666] text-[13px] sm:text-[14px] mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-[#233533] text-[14px] sm:text-[16px] shrink-0">
                    Rs. {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mt-[25px]">
              <h2 className="text-[19px] sm:text-[20px] font-bold text-black">
                Payment Method
              </h2>

              <div className="mt-[15px] flex flex-col gap-[12px]">
                <label className="flex items-center gap-[10px] cursor-pointer text-[14px] sm:text-[16px]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <span className="text-black">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-[10px] cursor-pointer text-[14px] sm:text-[16px]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Bank Transfer"
                    checked={paymentMethod === "Bank Transfer"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <span className="text-black">Bank Transfer</span>
                </label>

                <label className="flex items-center gap-[10px] cursor-pointer text-[14px] sm:text-[16px]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online Payment"
                    checked={paymentMethod === "Online Payment"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <span className="text-black">Online Payment</span>
                </label>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between gap-[15px] mt-[25px]">
              <h2 className="text-[21px] sm:text-[22px] font-bold text-black">
                Total
              </h2>

              <p className="text-[23px] sm:text-[25px] font-bold text-[#233533]">
                Rs. {total}
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-[13px] sm:text-[14px] mt-[15px]">
                {error}
              </p>
            )}

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              className="w-full h-[48px] sm:h-[50px] bg-black text-white rounded-[10px] mt-[25px] font-semibold hover:bg-[#233533] transition-all"
            >
              Place Order
            </button>

            {/* Back to Cart */}
            <button
              onClick={() => navigate("/Cart")}
              className="w-full h-[48px] sm:h-[50px] bg-[#d8f6f9] text-black border border-black rounded-[10px] mt-[12px] font-semibold hover:bg-[#bcecef] transition-all"
            >
              Back to Cart
            </button>
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

export default Checkout;
