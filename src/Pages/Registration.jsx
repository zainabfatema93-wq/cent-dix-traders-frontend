import React, { useState } from "react";
import Logo from "../assets/logo cent dix trader.jpg";
import Google from "../assets/Google.jpg";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { useAuthStore } from "../Store/authStore";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Signup, isLoading, error, setUser } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("1. Form submitted");
    console.log("Name:", name);
    console.log("Email:", email);

    try {
      console.log("2. Calling Signup...");

      const data = await Signup(name, email, password);

      console.log("3. Registration successful");
      console.log("Server response:", data);

      navigate("/Home");
    } catch (error) {
      console.log("4. Registration failed");
      console.log("Error:", error);
      console.log("Backend error:", error.response?.data);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      console.log("Google registration started...");

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      console.log("Google registration successful!");
      console.log("Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("UID:", user.uid);

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      console.log("Firebase token received");

      // Send Firebase token to backend
      const response = await axios.post(
        "https://cent-dix-traders-backend.vercel.app/api/auth/google",
        {
          token: idToken,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Backend Google response:", response.data);

      if (response.data.success) {
        setUser(response.data.user);

        console.log("User saved to Zustand:", response.data.user);

        navigate("/Home");
      }
    } catch (error) {
      console.log("Google registration failed:", error);
      console.log("Backend error:", error.response?.data);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#151414] to-[#0c2025] text-white flex flex-col items-center justify-start px-3 sm:px-5 pb-10 overflow-y-auto">
      {/* Logo */}
      <div
        className="w-full h-[70px] sm:h-[80px] flex items-center justify-start px-2 sm:px-5 md:px-[30px] gap-[8px] sm:gap-[10px] cursor-pointer shrink-0"
        onClick={() => navigate("/Home")}
      >
        <img
          className="w-[35px] sm:w-[40px]"
          src={Logo}
          alt="Cent Dix Traders Logo"
        />

        <h1 className="text-[17px] sm:text-[22px] font-sans transition-all duration-300 hover:text-cyan-400 hover:scale-105 whitespace-nowrap">
          CENT-DIX-TRADERS
        </h1>
      </div>

      {/* Heading */}
      <div className="w-full min-h-[100px] flex flex-col items-center justify-center gap-[10px] sm:gap-[15px] text-center px-2">
        <span className="text-[23px] sm:text-[25px] font-semibold">
          Registration Page
        </span>

        <span className="text-[13px] sm:text-[16px]">
          Welcome to Cent-Dix Traders, Place Your Order
        </span>
      </div>

      {/* Form Box */}
      <div className="max-w-[600px] w-full sm:w-[90%] min-h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center py-[25px] sm:py-[30px]">
        <form
          onSubmit={handleSignup}
          className="w-[88%] sm:w-[90%] min-h-[450px] flex flex-col items-center gap-[20px]"
        >
          {/* Google */}
          <div
            onClick={handleGoogleSignup}
            className="w-full sm:w-[90%] min-h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[15px] cursor-pointer text-[14px] sm:text-[16px]"
          >
            <img src={Google} alt="Google" className="w-[20px]" />
            Register with Google
          </div>

          {/* OR */}
          <div className="w-full flex items-center justify-center gap-[8px] sm:gap-[10px] text-[14px]">
            <div className="w-[35%] sm:w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[35%] sm:w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col gap-[15px] relative">
            {/* Name */}
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[48px] sm:h-[50px] border-2 border-[#96069635] rounded-lg bg-transparent px-[15px] sm:px-[20px] text-[14px] sm:text-[16px] outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[48px] sm:h-[50px] border-2 border-[#96069635] rounded-lg bg-transparent px-[15px] sm:px-[20px] text-[14px] sm:text-[16px] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[48px] sm:h-[50px] border-2 border-[#96069635] rounded-lg bg-transparent px-[15px] sm:px-[20px] pr-[50px] text-[14px] sm:text-[16px] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {!show ? (
                <IoEyeOutline
                  className="absolute right-[15px] sm:right-[20px] top-[14px] cursor-pointer w-[20px] h-[20px]"
                  onClick={() => setShow(true)}
                />
              ) : (
                <TiEye
                  className="absolute right-[15px] sm:right-[20px] top-[14px] cursor-pointer w-[20px] h-[20px]"
                  onClick={() => setShow(false)}
                />
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] sm:h-[50px] bg-[#6060f5] rounded-lg text-[16px] sm:text-[17px] font-semibold"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login */}
            <p className="flex flex-col sm:flex-row gap-[5px] sm:gap-[10px] justify-center items-center text-[13px] sm:text-[16px] text-center">
              <span>You have an account?</span>

              <span
                className="text-[#5555f6cf] cursor-pointer hover:text-white text-[16px]"
                onClick={() => navigate("/Login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
