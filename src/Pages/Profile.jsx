import React from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../Store/authStore";
import Footer from "../components/Footer";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] pt-[100px] px-5 flex flex-col">
      <Navbar />

      <div className="w-full max-w-[600px] mx-auto flex-1 pb-[120px]">
        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center mb-[30px]">
          <h1 className="text-[30px] sm:text-[35px] font-bold text-black">
            My Profile
          </h1>

          <p className="text-[#233533] mt-2 text-center">
            View your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="w-full bg-white rounded-[15px] shadow-md p-[30px]">
          {/* Profile Avatar */}
          <div className="w-full flex justify-center mb-[25px]">
            <div className="w-[80px] h-[80px] rounded-full bg-[#233533] text-white flex items-center justify-center text-[32px] font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          {/* Name */}
          <div className="mb-[20px]">
            <label className="block text-black font-semibold mb-2">Name</label>

            <div className="w-full min-h-[50px] bg-[#ecfafa] rounded-[10px] px-[15px] flex items-center text-[#233533]">
              {user?.name || "User"}
            </div>
          </div>

          {/* Email */}
          <div className="mb-[20px]">
            <label className="block text-black font-semibold mb-2">Email</label>

            <div className="w-full min-h-[50px] bg-[#ecfafa] rounded-[10px] px-[15px] flex items-center text-[#233533]">
              {user?.email || "No email available"}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[calc(100%+40px)] -ml-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
