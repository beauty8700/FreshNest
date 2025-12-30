import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserMenuVisible(false);
    };
    if (userMenuVisible) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [userMenuVisible]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 z-[2] h-[8vh] w-[100%] bg-white flex px-2 md:px-16 items-center shadow-md border-b-2 border-light-beige"
      >
        <Link to="/">
          <img className="h-20 py-2 object-contain" src={logo} alt="FreshNest Logo" />
        </Link>
        <div className="flex flex-1"></div>

        <NavBarItem text="Home" route="/" />
        <NavBarItem text="About" route="/about" />
        <NavBarItem text="Shop" route="/shop" />
        <NavBarItem text="Contact" route="/contact" />

        {isAuthenticated ? (
          <>
            <div className="relative mr-4">
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 hover:bg-mint-green rounded-full transition"
              >
                <i className="fa-solid fa-cart-shopping text-xl text-forest-green"></i>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sage-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount() > 9 ? '9+' : getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuVisible(!userMenuVisible);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-mint-green rounded-lg transition"
              >
                <i className="fa-solid fa-user-circle text-xl text-forest-green"></i>
                <span className="hidden lg:block text-forest-green font-medium">{user?.name || 'User'}</span>
                <i className={`fa-solid fa-chevron-down text-xs text-forest-green ${userMenuVisible ? 'rotate-180' : ''} transition`}></i>
              </button>
              {userMenuVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-light-beige z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-mint-green text-forest-green transition"
                    onClick={() => setUserMenuVisible(false)}
                  >
                    <i className="fa-solid fa-user mr-2"></i>Dashboard
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-mint-green text-forest-green transition"
                    onClick={() => setUserMenuVisible(false)}
                  >
                    <i className="fa-solid fa-heart mr-2"></i>Wishlist
                  </Link>
                  {user?.userType === 'farmer' && (
                    <Link
                      to="/farmer-dashboard"
                      className="block px-4 py-2 hover:bg-mint-green text-forest-green transition"
                      onClick={() => setUserMenuVisible(false)}
                    >
                      <i className="fa-solid fa-tractor mr-2"></i>Farmer Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuVisible(false);
                      navigate('/');
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-mint-green text-forest-green transition"
                  >
                    <i className="fa-solid fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block px-4 py-2 text-forest-green hover:bg-mint-green rounded-lg transition font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="hidden md:block bg-sage-green hover:bg-forest-green text-white px-4 py-2 rounded-lg transition font-medium"
            >
              Sign Up
            </button>
          </>
        )}

        <div
          onClick={() => {
            setDrawerVisible(!drawerVisible);
          }}
          className="visible md:hidden mr-2 h-[100%] w-[20%] flex justify-end items-center"
        >
          <i
            className={`fa-solid ${!drawerVisible ? "fa-bars" : "fa-close"} text-forest-green text-xl`}
          ></i>
        </div>
      </motion.header>
      {drawerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-[8vh] z-[1] visible md:hidden w-[100%] flex flex-col bg-white border-b-2 border-light-beige"
        >
          <MobileNavBarItem text="Home" route="/" />
          <MobileNavBarItem text="Shop" route="/shop" />
          <MobileNavBarItem text="About" route="/about" />
          <MobileNavBarItem text="Contact" route="/contact" />
          {isAuthenticated ? (
            <>
              <MobileNavBarItem text="Cart" route="/cart" />
              <MobileNavBarItem text="Dashboard" route="/dashboard" />
              <MobileNavBarItem text="Wishlist" route="/wishlist" />
              {user?.userType === 'farmer' && (
                <MobileNavBarItem text="Farmer Dashboard" route="/farmer-dashboard" />
              )}
              <div
                onClick={() => {
                  logout();
                  setDrawerVisible(false);
                  navigate('/');
                }}
                className="bg-light-beige py-3 px-2 border-b border-light-beige"
              >
                <h1 className="text-forest-green font-medium">Logout</h1>
              </div>
            </>
          ) : (
            <>
              <MobileNavBarItem text="Login" route="/login" />
              <MobileNavBarItem text="Sign Up" route="/signup" />
            </>
          )}
        </motion.div>
      )}
    </>
  );
}

function MobileNavBarItem({ text = "NavItem", route = "/" }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(route);
      }}
      className="bg-light-beige py-3 px-2 border-b border-cream-tan hover:bg-mint-green transition"
    >
      <h1 className="text-forest-green font-medium">{text}</h1>
    </div>
  );
}

function NavBarItem({ text = "NavItem", route = "/" }) {
  var navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      className="hidden lg:flex md:flex items-center text-center h-[100%] px-5 mx-2 hover:bg-mint-green hover:text-forest-green cursor-pointer rounded-md transition"
    >
      <h1 className="text-lg font-medium text-forest-green">{text}</h1>
    </div>
  );
}

export default NavBar;

