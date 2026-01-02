import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemCount, lastAddedItem } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);

  useEffect(() => {
    if (lastAddedItem) {
      setShowCartToast(true);
      const timer = setTimeout(() => setShowCartToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 z-50 w-full h-[72px]
        bg-white border-b border-emerald-100 shadow-sm
        flex items-center px-4 md:px-14"
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="FreshNest" className="h-12 object-contain" />
          <span className="hidden sm:block font-bold text-xl text-forest-green">
            FreshNest
          </span>
        </Link>

        <div className="flex-1" />

        <nav className="hidden md:flex items-center gap-2">
          <NavItem to="/" label="Home" />
          <NavItem to="/shop" label="Shop" />
          <NavItem to="/about" label="About" />
          <NavItem to="/contact" label="Contact" />

          {isAuthenticated && user?.userType !== "farmer" && (
            <button
              onClick={() => navigate("/cart")}
              className={`relative px-4 h-[42px] flex items-center gap-2
              rounded-lg transition hover:bg-emerald-50
              ${location.pathname === "/cart" ? "bg-emerald-100" : ""}`}
            >Cart 
              <i className="fa-solid fa-cart-shopping text-lg text-forest-green" />

              {getCartItemCount() > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[20px] h-[20px]
                  bg-red-600 text-white text-[11px] font-bold
                  rounded-full flex items-center justify-center
                  shadow-md scale-95"
                >
                  {getCartItemCount() > 9 ? "9+" : getCartItemCount()}
                </span>
              )}
            </button>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg text-forest-green
                hover:bg-emerald-50 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-lg bg-forest-green
                text-white hover:bg-emerald-800 font-medium"
              >
                Sign Up
              </button>
            </>
          ) : (
          <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg
                hover:bg-emerald-50 transition"
              >
                <div
                  className="w-8 h-8 rounded-full bg-forest-green
                  text-white flex items-center justify-center font-bold"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="font-medium text-forest-green hidden lg:block">
                  {user?.name}
                </span>
                <i className="fa-solid fa-chevron-down text-xs text-forest-green" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-52
                    bg-white border rounded-xl shadow-lg overflow-hidden"
                  >
                    {user?.userType === "farmer" ? (
                      <DropdownItem to="/farmer-dashboard" label="Farmer Dashboard" />
                    ) : (
                      <>
                        <DropdownItem to="/dashboard" label="My Dashboard" />
                        <DropdownItem to="/wishlist" label="Wishlist" />
                        <DropdownItem to="/orders" label="Orders" />
                      </>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2
                      text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="md:hidden ml-3 text-2xl text-forest-green"
        >
          <i className={`fa-solid ${drawerOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </motion.header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-[72px] w-full bg-white z-40
            border-b shadow-md md:hidden"
          >
            <MobileItem to="/" label="Home" />
            <MobileItem to="/shop" label="Shop" />
            <MobileItem to="/about" label="About" />
            <MobileItem to="/contact" label="Contact" />

            {isAuthenticated && <MobileItem to="/cart" label="Cart" />}
            {!isAuthenticated ? (
              <>
                <MobileItem to="/login" label="Login" />
                <MobileItem to="/signup" label="Sign Up" />
              </>
            ) : (
              <MobileItem to="/dashboard" label="Dashboard" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCartToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50
            bg-forest-green text-white px-5 py-3
            rounded-xl shadow-xl flex items-center gap-3"
          >
            <i className="fa-solid fa-circle-check text-lg" />
            <span className="font-medium">
              {lastAddedItem?.name || "Item"} added to cart
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


const NavItem = ({ to, label }) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg font-medium transition
      ${
        location.pathname === to
          ? "bg-emerald-100 text-forest-green"
          : "text-forest-green hover:bg-emerald-50"
      }`}
    >
      {label}
    </Link>
  );
};

const MobileItem = ({ to, label }) => (
  <Link
    to={to}
    className="block px-5 py-3 border-b
    text-forest-green hover:bg-emerald-50"
  >
    {label}
  </Link>
);

const DropdownItem = ({ to, label }) => (
  <Link
    to={to}
    className="block px-4 py-2 hover:bg-emerald-50 text-forest-green"
  >
    {label}
  </Link>
);

export default NavBar;
