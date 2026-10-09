import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../Store/cartStore";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const stock = Number(product.stock) || 0;

  const handleProductClick = () => {
    navigate(`/ProductDetails?id=${product._id || product.id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();

    if (stock <= 0) {
      return;
    }

    addToCart(product, 1);

    console.log("Added to cart:", product);
  };

  return (
    <div
      onClick={handleProductClick}
      className="w-full max-w-[280px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-[250px] bg-[#d8f6f9] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="p-4">
        <h2 className="text-[18px] font-semibold text-black">{product.name}</h2>

        <p className="text-[#666] text-[14px] mt-1">{product.category}</p>

        <p className="text-[20px] font-bold text-[#233533] mt-3">
          Rs. {product.price}
        </p>

        {/* Stock */}
        <p
          className={`text-[14px] font-semibold mt-2 ${
            stock > 0 ? "text-[#233533]" : "text-red-500"
          }`}
        >
          {stock > 0 ? `Stock: ${stock}` : "Out of Stock"}
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`w-full h-[45px] text-white rounded-lg mt-4 transition-all ${
            stock > 0
              ? "bg-black hover:bg-[#233533] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
