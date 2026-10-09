import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "https://cent-dix-traders-backend.vercel.app/api/messages",
        formData,
        {
          withCredentials: true,
        },
      );

      setSuccess("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log("Contact form error:", error);
      console.log("Backend error:", error.response?.data);

      setSuccess("");
      alert(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] flex flex-col">
      <Navbar />

      <main className="w-full flex-1 pt-[100px] pb-[120px] px-3 sm:px-5">
        <div className="w-full max-w-[900px] mx-auto">
          <div className="w-full flex flex-col items-center text-center mb-[30px]">
            <h1 className="text-[30px] sm:text-[35px] font-bold text-black">
              Contact Us
            </h1>

            <p className="text-[#233533] mt-2">
              Get in touch with Cent-Dix Traders
            </p>
          </div>

          <div className="w-full bg-white rounded-[15px] shadow-md p-[25px] sm:p-[35px]">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-[15px]">
                <label className="block text-black font-semibold mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full h-[50px] border border-gray-300 rounded-[8px] px-[15px] outline-none focus:border-black"
                />
              </div>

              {/* Email */}
              <div className="mb-[15px]">
                <label className="block text-black font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full h-[50px] border border-gray-300 rounded-[8px] px-[15px] outline-none focus:border-black"
                />
              </div>

              {/* Message */}
              <div className="mb-[20px]">
                <label className="block text-black font-semibold mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  required
                  className="w-full h-[120px] border border-gray-300 rounded-[8px] px-[15px] py-[12px] outline-none resize-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full h-[50px] bg-black text-white rounded-[10px] font-semibold hover:bg-[#233533] transition-all"
              >
                Send Message
              </button>
              {success && (
                <p className="text-green-600 text-[14px] sm:text-[16px] text-center mt-[15px]">
                  {success}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
