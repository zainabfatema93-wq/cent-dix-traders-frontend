import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 Welcome to Cent-Dix Traders! How can I help you today? 🛍️",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Automatically scroll to the latest message
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || isLoading) {
      return;
    }

    const userMessage = message.trim();

    // Show user message immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://cent-dix-traders-backend.vercel.app/api/ai/chat",

        {
          message: userMessage,
          history: messages.map((item) => ({
            role: item.sender === "user" ? "user" : "assistant",
            content: item.text,
          })),
        },
        {
          withCredentials: true,
        },
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: response.data.reply,
          productId: response.data.productId,
        },
      ]);
    } catch (error) {
      console.log("AI chat error:", error.response?.data || error.message);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "Sorry, I could not process your message right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* AI BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[20px] right-[20px] z-50 w-[55px] h-[55px] rounded-full bg-[#111b1e] text-white shadow-lg flex items-center justify-center text-[25px] hover:scale-105 transition"
        >
          🤖
        </button>
      )}

      {/* CHAT BOX */}
      {isOpen && (
        <div className="fixed bottom-[20px] right-[20px] z-50 w-[320px] sm:w-[360px] h-[450px] bg-white rounded-[15px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* HEADER */}
          <div className="h-[60px] shrink-0 bg-[#111b1e] text-white px-[15px] flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold">🤖 Cent-Dix AI</h2>

              <p className="text-[11px] text-gray-400">
                Your shopping assistant
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white text-[20px]"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 min-h-0 bg-gray-50 p-[15px] overflow-y-auto">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex mb-[12px] ${
                  item.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-[12px] py-[10px] max-w-[80%] rounded-[10px] shadow-sm break-words ${
                    item.sender === "user"
                      ? "bg-[#111b1e] text-white"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  <p className="text-[13px] whitespace-pre-wrap">{item.text}</p>

                  {item.sender === "ai" && item.productId && (
                    <button
                      onClick={() =>
                        (window.location.href = `/ProductDetails?id=${item.productId}`)
                      }
                      className="mt-[8px] w-full bg-[#111b1e] text-white rounded-[8px] py-[7px] text-[12px] hover:opacity-90"
                    >
                      View Product
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* LOADING INDICATOR */}
            {isLoading && (
              <div className="flex mb-[12px]">
                <div className="bg-white border border-gray-200 rounded-[10px] px-[12px] py-[10px] shadow-sm">
                  <p className="text-[13px] text-gray-500">
                    Cent-Dix AI is typing...
                  </p>
                </div>
              </div>
            )}

            {/* AUTO-SCROLL TARGET */}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSend}
            className="h-[65px] shrink-0 border-t border-gray-200 p-[10px] flex items-center gap-[8px]"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about dresses, perfumes, or prices..."
              className="flex-1 min-w-0 h-[42px] border border-gray-300 rounded-[9px] px-[12px] text-[13px] outline-none focus:border-[#111b1e]"
            />

            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="w-[42px] h-[42px] shrink-0 rounded-[9px] bg-[#111b1e] text-white flex items-center justify-center disabled:opacity-50"
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
