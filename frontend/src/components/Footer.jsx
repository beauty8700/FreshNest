import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-forest-green text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-mint-green">FreshNest</h3>
            <p className="text-light-beige mb-4">
              Connecting local farmers with customers. Fresh, organic produce delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-beige hover:text-mint-green transition">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-light-beige hover:text-mint-green transition">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-light-beige hover:text-mint-green transition">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-mint-green">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-light-beige hover:text-mint-green transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light-beige hover:text-mint-green transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-light-beige hover:text-mint-green transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light-beige hover:text-mint-green transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-mint-green">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-light-beige hover:text-mint-green transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-light-beige hover:text-mint-green transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-light-beige hover:text-mint-green transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <a href="#" className="text-light-beige hover:text-mint-green transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-mint-green">Newsletter</h4>
            <p className="text-light-beige mb-4">
              Subscribe to get updates on fresh produce and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-forest-green focus:outline-none focus:ring-2 focus:ring-mint-green"
              />
              <button className="bg-sage-green hover:bg-moss-green px-6 py-2 rounded-r-lg transition">
                <FaEnvelope />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-moss-green mt-8 pt-8 text-center text-light-beige">
          <p>&copy; {new Date().getFullYear()} FreshNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

