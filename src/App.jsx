import { useEffect } from "react";
import "./App.css";
import AIChat from "./components/AIChat";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Registration from "./Pages/Registration";
import { Home } from "./Pages/Home";
import Login from "./Pages/Login";
import Products from "./Pages/Products";

import { useAuthStore } from "./Store/authStore";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/checkOut";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import About from "./Pages/about";
import Contact from "./Pages/contact";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (
      user &&
      (location.pathname === "/Login" ||
        location.pathname === "/Signup" ||
        location.pathname === "/")
    ) {
      navigate("/Home", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  const publicPages = ["/Login", "/Signup"];
  const isPublicPage = publicPages.includes(location.pathname);

  if (!user && !isPublicPage) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/Home" : "/Login"} replace />}
        />

        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Registration />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        <Route
          path="*"
          element={<Navigate to={user ? "/Home" : "/Login"} replace />}
        />
      </Routes>

      {user && <AIChat />}
    </>
  );
}

export default App;
