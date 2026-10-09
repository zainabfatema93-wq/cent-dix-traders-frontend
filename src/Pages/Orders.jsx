import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const demoOrders = [
  {
    id: "ORD-1001",
    date: "23 September 2026",
    items: 3,
    total: 30000,
    payment: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: "ORD-1002",
    date: "20 September 2026",
    items: 2,
    total: 15000,
    payment: "Bank Transfer",
    status: "Delivered",
  },
];

const Orders = () => {
  return (
    <div className="w-full min-h-screen bg-[#ecfafa] pt-[100px] px-3 sm:px-5 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="w-full flex-1 pb-[120px]">
        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center mb-[25px] sm:mb-[30px]">
          <h1 className="text-[28px] sm:text-[35px] font-bold text-black text-center">
            My Orders
          </h1>

          <p className="text-[#233533] mt-2 text-center text-[14px] sm:text-[16px]">
            View your orders and order details
          </p>
        </div>

        {/* Orders */}
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-[20px]">
          {demoOrders.map((order) => (
            <div
              key={order.id}
              className="w-full bg-white rounded-[15px] shadow-md p-[20px] sm:p-[25px]"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[12px]">
                <div>
                  <h2 className="text-[19px] sm:text-[20px] font-bold text-black">
                    {order.id}
                  </h2>

                  <p className="text-[#666] text-[13px] sm:text-[14px] mt-1">
                    {order.date}
                  </p>
                </div>

                <p className="font-bold text-[#233533] text-[15px] sm:text-[16px]">
                  {order.status}
                </p>
              </div>

              {/* Order Details */}
              <div className="mt-[20px] border-t border-gray-200 pt-[20px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px]">
                <div>
                  <p className="text-black text-[14px] sm:text-[16px]">
                    Items: <span className="font-semibold">{order.items}</span>
                  </p>

                  <p className="text-black text-[14px] sm:text-[16px] mt-1">
                    Payment:{" "}
                    <span className="font-semibold">{order.payment}</span>
                  </p>
                </div>

                <div>
                  <p className="text-[21px] sm:text-[22px] font-bold text-[#233533]">
                    Rs. {order.total}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="w-[calc(100%+24px)] sm:w-[calc(100%+40px)] -ml-[12px] sm:-ml-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default Orders;
