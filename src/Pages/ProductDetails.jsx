import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useCartStore } from "../Store/cartStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [showZoom, setShowZoom] = useState(false);

  // Hover zoom
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCartStore();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productId = searchParams.get("id");

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.get(
          `https://cent-dix-traders-backend.vercel.app/api/products/${productId}`,
          {
            withCredentials: true,
          },
        );

        console.log("Single Product Response:", response.data);

        if (response.data.success) {
          setProduct(response.data.product);

          const images = response.data.product.images?.length
            ? response.data.product.images
            : [response.data.product.image];

          setSelectedImage(images[0]);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.error("Fetch product error:", error);

        setError(error.response?.data?.message || "Failed to load product.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError("Product ID is missing.");
      setIsLoading(false);
    }
  }, [productId]);

  // Increase quantity
  const increaseQuantity = () => {
    if (!product || quantity >= product.stock) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (!product || quantity <= 1) {
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    addToCart(product, quantity);

    console.log("Product added to cart:", {
      ...product,
      quantity,
    });
  };

  // Buy now
  const handleBuyNow = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    addToCart(product, quantity);

    console.log("Buy Now:", {
      ...product,
      quantity,
    });

    navigate("/Checkout");
  };

  // Hover Zoom
  const handleMouseMove = (event) => {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    setZoomPosition({
      x,
      y,
    });
  };

  // Loading
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#ecfafa] flex flex-col">
        <Navbar />

        <div className="w-full flex-1 flex items-center justify-center pt-[90px]">
          <p className="text-[#233533] text-[18px]">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="w-full min-h-screen bg-[#ecfafa] flex flex-col">
        <Navbar />

        <div className="w-full flex-1 flex flex-col items-center justify-center pt-[90px] px-5">
          <h1 className="text-[25px] sm:text-[30px] font-bold text-black text-center">
            {error || "Product not found"}
          </h1>

          <button
            onClick={() => navigate("/Products")}
            className="w-[200px] h-[50px] bg-black text-white rounded-[10px] mt-[25px] hover:bg-[#233533] transition-all"
          >
            Back to Products
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  // Product Images
  const productImages = product.images?.length
    ? product.images
    : [product.image];

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] pt-[90px] px-3 sm:px-5 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="w-full flex-1 pb-[40px]">
        {/* Page Heading */}
        <div className="w-full flex flex-col items-center justify-center mt-[20px] mb-[25px] sm:mb-[30px]">
          <h1 className="text-[28px] sm:text-[35px] font-bold text-black text-center">
            Product Details
          </h1>

          <p className="text-[#233533] mt-2 text-center text-[14px] sm:text-[16px]">
            Explore product details
          </p>
        </div>

        {/* Product Details Card */}
        <div className="w-full max-w-[1100px] mx-auto bg-white rounded-[20px] shadow-lg overflow-hidden">
          <div className="w-full flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="w-full md:w-1/2 min-h-[280px] sm:min-h-[380px] md:min-h-[500px] bg-[#d8f6f9] flex flex-col items-center justify-center p-[20px] sm:p-[30px]">
              {/* Main Image */}
              <div
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setShowZoom(true)}
                className="w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden cursor-zoom-in"
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-150"
                  style={{
                    transform: isHoveringImage ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center justify-center gap-[10px] sm:gap-[15px] mt-[20px]">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(image);

                      // Reset zoom position when image changes
                      setZoomPosition({
                        x: 50,
                        y: 50,
                      });
                    }}
                    className={`w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] rounded-[8px] overflow-hidden border-2 ${
                      selectedImage === image
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="w-full md:w-1/2 p-[20px] sm:p-[30px] md:p-[45px] flex flex-col justify-center">
              {/* Category */}
              <p className="text-[#666] text-[14px] sm:text-[15px]">
                {product.category}
              </p>

              {/* Product Name */}
              <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-bold text-black mt-[8px] break-words">
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#233533] mt-[15px] sm:mt-[20px]">
                Rs. {product.price}
              </p>

              {/* Description */}
              <p className="text-[#555] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] mt-[15px] sm:mt-[20px]">
                {product.description}
              </p>

              {/* Stock */}
              <p className="text-[#233533] text-[14px] sm:text-[15px] mt-[15px]">
                Stock: {product.stock}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-[10px] sm:gap-[15px] mt-[20px] sm:mt-[25px]">
                <p className="font-semibold text-black">Quantity:</p>

                <div className="flex items-center border border-gray-400 rounded-[8px] overflow-hidden">
                  {/* Minus */}
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className={`w-[38px] h-[40px] sm:w-[40px] text-white text-[20px] transition-all ${
                      quantity <= 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#233533] hover:bg-black cursor-pointer"
                    }`}
                  >
                    -
                  </button>

                  {/* Quantity */}
                  <span className="w-[42px] h-[40px] sm:w-[45px] flex items-center justify-center text-black font-semibold">
                    {quantity}
                  </span>

                  {/* Plus */}
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className={`w-[38px] h-[40px] sm:w-[40px] text-white text-[20px] transition-all ${
                      quantity >= product.stock
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#233533] hover:bg-black cursor-pointer"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full h-[48px] sm:h-[50px] rounded-[10px] mt-[25px] sm:mt-[30px] text-[16px] sm:text-[17px] font-semibold transition-all ${
                  product.stock <= 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-[#233533] cursor-pointer"
                }`}
              >
                {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className={`w-full h-[48px] sm:h-[50px] rounded-[10px] mt-[12px] text-[16px] sm:text-[17px] font-semibold transition-all ${
                  product.stock <= 0
                    ? "bg-gray-300 text-gray-600 border border-gray-400 cursor-not-allowed"
                    : "bg-[#d8f6f9] text-black border border-black hover:bg-[#bcecef] cursor-pointer"
                }`}
              >
                {product.stock <= 0 ? "Out of Stock" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Click Zoom Image */}
        {showZoom && (
          <div
            onClick={() => setShowZoom(false)}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-[20px] cursor-zoom-out"
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetails;
