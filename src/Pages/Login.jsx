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

const Login = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, setUser, isLoading, error } = useAuthStore();

  // Normal Login
  const handlelogin = async (e) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("Email:", email);

    try {
      console.log("Calling login...");

      const data = await login(email, password);

      console.log("Login successful");
      console.log("Server response:", data);

      navigate("/Home");
    } catch (error) {
      console.log("Login failed");
      console.log("Error:", error);
      console.log("Backend error:", error.response?.data);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      console.log("Google login started...");

      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      console.log("Google login successful!");
      console.log("Name:", firebaseUser.displayName);
      console.log("Email:", firebaseUser.email);
      console.log("UID:", firebaseUser.uid);

      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      console.log("Firebase ID token received");

      // Send Firebase ID token to backend
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

      // Save user in Zustand
      if (response.data.success) {
        setUser(response.data.user);

        console.log("User saved to Zustand:", response.data.user);

        navigate("/Home");
      }
    } catch (error) {
      console.log("Google login failed:", error);
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

        <h1 className="text-[17px] sm:text-[22px] font-sans cursor-pointer transition-all duration-300 hover:text-cyan-400 hover:scale-105 hover:drop-shadow-[0_0_8px_#22d3ee] whitespace-nowrap">
          CENT-DIX-TRADERS
        </h1>
      </div>

      {/* Heading */}
      <div className="w-full min-h-[100px] flex items-center justify-center flex-col gap-[10px] sm:gap-[15px] text-center px-2">
        <span className="text-[23px] sm:text-[25px] font-semibold">
          Login Page
        </span>

        <span className="text-[13px] sm:text-[16px]">
          Welcome to Cent-Dix Traders, Place Your Order
        </span>
      </div>

      {/* Login Box */}
      <div className="max-w-[600px] w-full sm:w-[90%] min-h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center py-[25px] sm:py-[30px]">
        <form
          onSubmit={handlelogin}
          className="w-[88%] sm:w-[90%] min-h-[450px] flex flex-col items-center justify-start gap-[20px]"
        >
          {/* Google Login */}
          <div
            onClick={handleGoogleLogin}
            className="w-full sm:w-[90%] min-h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[15px] cursor-pointer text-[14px] sm:text-[16px]"
          >
            <img src={Google} alt="Google" className="w-[20px]" />
            Login with Google
          </div>

          {/* OR */}
          <div className="w-full h-[20px] flex items-center justify-center gap-[8px] sm:gap-[10px] text-[14px]">
            <div className="w-[35%] sm:w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[35%] sm:w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col items-center justify-center gap-[15px] relative">
            {/* Email */}
            <input
              type="email"
              className="w-full h-[48px] sm:h-[50px] border-[2px] border-[#96069635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:text-[#ffffffc7] px-[15px] sm:px-[20px] font-semibold text-[14px] sm:text-[16px] outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type={show ? "text" : "password"}
              className="w-full h-[48px] sm:h-[50px] border-[2px] border-[#96069635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:text-[#ffffffc7] px-[15px] sm:px-[20px] pr-[50px] font-semibold text-[14px] sm:text-[16px] outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Password Eye */}
            {!show ? (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[15px] sm:right-[20px] top-[65px]"
                onClick={() => setShow(true)}
              />
            ) : (
              <TiEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[15px] sm:right-[20px] top-[65px]"
                onClick={() => setShow(false)}
              />
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center w-full">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] sm:h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[5px] sm:mt-[10px] text-[16px] sm:text-[17px] font-semibold"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Signup */}
            <p className="flex flex-col sm:flex-row gap-[5px] sm:gap-[10px] items-center justify-center text-[13px] sm:text-[16px] text-center">
              <span>You haven't any account?</span>

              <span
                className="text-[#5555f6cf] text-[16px] sm:text-[17px] font-semibold cursor-pointer hover:text-white"
                onClick={() => navigate("/Signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
