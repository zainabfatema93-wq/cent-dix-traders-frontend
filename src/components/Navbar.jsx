import React, { useState } from "react";
import Logo from "../assets/logo cent dix trader.jpg";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAuthStore } from "../Store/authStore";
import { useCartStore } from "../Store/cartStore";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      setShowProfile(false);

      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 left-0 flex items-center justify-between px-[15px] sm:px-[20px] md:px-[30px] shadow-md shadow-black">
      {/* Logo + Name */}
      <div className="w-auto flex items-center justify-start gap-[8px] sm:gap-[10px]">
        <img className="w-[30px]" src={Logo} alt="Cent Dix Traders Logo" />

        <h1 className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-black font-sans whitespace-nowrap">
          Cent-Dix Traders
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="w-[40%] hidden lg:flex">
        <ul className="flex items-center justify-center gap-[20px] text-white">
          <li
            onClick={() => navigate("/Home")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[10px] py-[5px] rounded-2xl"
          >
            HOME
          </li>

          <li
            onClick={() => navigate("/Products")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[10px] py-[5px] rounded-2xl"
          >
            COLLECTIONS
          </li>

          <li
            onClick={() => navigate("/About")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[10px] py-[5px] rounded-2xl"
          >
            ABOUT
          </li>

          <li
            onClick={() => navigate("/Contact")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] px-[10px] py-[5px] rounded-2xl"
          >
            CONTACT
          </li>
        </ul>
      </div>

      {/* Right Side Icons */}
      <div className="w-auto lg:w-[30%] flex items-center justify-end gap-[10px] sm:gap-[15px] lg:gap-[20px]">
        {/* Search Icon */}
        {user ? (
          <IoSearchCircleSharp
            onClick={() => setShowSearch((prev) => !prev)}
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[38px] lg:h-[38px] text-black cursor-pointer"
          />
        ) : (
          <IoSearchCircleOutline className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] lg:w-[38px] lg:h-[38px] text-black cursor-pointer" />
        )}

        {/* User Icon / First Letter */}
        {user ? (
          <div
            className="w-[35px] h-[35px] rounded-full bg-black text-white flex items-center justify-center font-bold text-[18px] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          <FaCircleUser
            onClick={() => setShowProfile((prev) => !prev)}
            className="w-[30px] h-[30px] text-black cursor-pointer"
          />
        )}

        {/* Desktop Shopping Cart */}
        <MdOutlineShoppingCart
          onClick={() => navigate("/Cart")}
          className="w-[30px] h-[30px] text-black cursor-pointer hidden md:block"
        />

        {/* Desktop Cart Count */}
        <p className="absolute w-[18px] h-[18px] hidden md:flex items-center justify-center bg-black text-white rounded-full text-[9px] top-[10px] right-[23px]">
          {cartCount}
        </p>
      </div>

      {/* Search Box */}
      {showSearch && (
        <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(`/Products?search=${encodeURIComponent(searchTerm)}`);
                setShowSearch(false);
              }
            }}
            className="w-[85%] sm:w-[70%] lg:w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[20px] sm:px-[30px] lg:px-[50px] placeholder:text-white text-[16px] sm:text-[18px] text-white outline-none"
            placeholder="Search Here"
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute w-[150px] h-[220px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="w-full h-full flex items-start justify-around flex-col text-[17px] py-[10px] text-white">
            {!user && (
              <li
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  navigate("/Login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}

            {user && (
              <li
                onClick={handleLogout}
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
              >
                LogOut
              </li>
            )}

            <li
              onClick={() => {
                navigate("/Orders");
                setShowProfile(false);
              }}
              className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            >
              Orders
            </li>

            <li
              onClick={() => {
                navigate("/Profile");
                setShowProfile(false);
              }}
              className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            >
              Profile
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191918] lg:hidden">
        {/* Home */}
        <button
          onClick={() => navigate("/Home")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          <IoMdHome className="w-[25px] h-[25px]" />
          Home
        </button>

        {/* Collections */}
        <button
          onClick={() => navigate("/Products")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          <HiOutlineCollection className="w-[25px] h-[25px]" />
          Collections
        </button>
        {/* Contact */}
        <button
          onClick={() => navigate("/Contact")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          <MdContacts className="w-[25px] h-[25px]" />
          Contact
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/Cart")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          <MdOutlineShoppingCart className="w-[25px] h-[25px]" />
          Cart
        </button>
      </div>
    </div>
  );
};

export default Navbar;
