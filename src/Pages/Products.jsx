import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Products = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Get categories from real products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const priceRanges = ["All", "Under 5000", "5000-10000", "Above 10000"];

  const sortOptions = ["Default", "Price Low to High", "Price High to Low"];

  // Filter + Search + Sort
  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedPrice === "All" ||
          (selectedPrice === "Under 5000" && product.price < 5000) ||
          (selectedPrice === "5000-10000" &&
            product.price >= 5000 &&
            product.price <= 10000) ||
          (selectedPrice === "Above 10000" && product.price > 10000)),
    )
    .sort((a, b) => {
      if (sortBy === "Price Low to High") {
        return a.price - b.price;
      }

      if (sortBy === "Price High to Low") {
        return b.price - a.price;
      }

      return 0;
    });

  // Get search from URL
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  // Fetch real products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.get(
          "https://cent-dix-traders-backend.vercel.app/api/products",
          {
            withCredentials: true,
          },
        );

        console.log("Products response:", response.data);

        if (response.data.success) {
          setProducts(response.data.products || []);
        } else {
          setError("Failed to load products.");
        }
      } catch (error) {
        console.error("Fetch products error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#ecfafa] flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="w-full flex-1 pt-[90px] pb-[50px] px-3 sm:px-5">
        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-10">
          <h1 className="text-[28px] sm:text-[35px] font-bold text-black text-center">
            Our Products
          </h1>

          <p className="text-[#233533] mt-2 text-center text-[14px] sm:text-[16px]">
            Explore our latest products
          </p>
        </div>

        {/* Categories */}
        {!isLoading && products.length > 0 && (
          <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[15px] transition-all ${
                  selectedCategory === category
                    ? "bg-[#233533] text-white"
                    : "bg-white text-black hover:bg-[#d8f6f9]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Price Filter */}
        {!isLoading && products.length > 0 && (
          <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {priceRanges.map((price) => (
              <button
                key={price}
                onClick={() => setSelectedPrice(price)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[15px] transition-all ${
                  selectedPrice === price
                    ? "bg-[#233533] text-white"
                    : "bg-white text-black hover:bg-[#d8f6f9]"
                }`}
              >
                {price === "All"
                  ? "All Prices"
                  : price === "Under 5000"
                    ? "Under Rs. 5,000"
                    : price === "5000-10000"
                      ? "Rs. 5,000 - 10,000"
                      : "Above Rs. 10,000"}
              </button>
            ))}
          </div>
        )}

        {/* Sort */}
        {!isLoading && products.length > 0 && (
          <div className="w-full flex justify-center items-center mb-8">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-[200px] sm:w-auto px-4 sm:px-5 py-2 rounded-full bg-white text-black border border-[#233533] outline-none cursor-pointer text-[14px] sm:text-[15px]"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "Default" ? "Sort By" : option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="w-full flex justify-center items-center py-10">
            <p className="text-[#233533] text-[16px] sm:text-[18px]">
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="w-full flex flex-col justify-center items-center py-10">
            <p className="text-red-500 text-[16px] sm:text-[18px] text-center">
              {error}
            </p>
          </div>
        )}

        {/* Real Products */}
        {!isLoading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length > 0 && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

        {/* No Products in Database */}
        {!isLoading && !error && products.length === 0 && (
          <div className="w-full flex justify-center items-center py-10">
            <p className="text-[#233533] text-[18px] text-center">
              No products available.
            </p>
          </div>
        )}

        {/* No Filter Results */}
        {!isLoading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <div className="w-full flex justify-center items-center py-10">
              <p className="text-[#233533] text-[16px] sm:text-[18px] text-center">
                No products match your selected filters.
              </p>
            </div>
          )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
