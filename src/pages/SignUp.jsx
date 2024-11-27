import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import farm from '../assets/farm.jpg';
import icon from '../assets/logo.png';
import PasswordField from '../components/PasswordField';
import ButtonLoader from '../components/ButtonLoader';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
    phone: ''
  });

  const handleSignUp = () => {
    if (data.email.length === 0) {
      toast.error('Enter your email to sign up');
      return;
    }

    if (data.password.length === 0) {
      toast.error('Enter your password to sign up');
      return;
    }

    if (data.userType.length === 0) {
      toast.error('Select your user type to register');
      return;
    }

    if (data.phone.length < 10) {
      toast.error('Enter a correct phone number to continue');
      return;
    }

    setLoading(true);

  
    setTimeout(() => {
      setLoading(false);
      toast.success('Sign-up successful!');
    }, 2000);
  };

  const handleFieldChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="float-right relative h-screen w-screen lg:w-[40%] bg-white flex items-center justify-center">
        <div className="absolute right-3 top-3">
          <img className="h-[75px] object-contain mr-1" src={icon} alt="Logo" />
        </div>
        <div className="flex flex-col items-center justify-center px-8 max-w-lg mx-auto bg-green-100 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-black text-gray-800 mb-4">Register to FreshNest</h1>
          <p className="font-extralight text-gray-600 mb-8">Create an account</p>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="name" className="text-gray-700 mb-2">Name</label>
            <input
              name="name"
              onChange={handleFieldChange}
              type="text"
              className="input input-bordered w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="email" className="text-gray-700 mb-2">Email</label>
            <input
              name="email"
              onChange={handleFieldChange}
              type="email"
              className="input input-bordered w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-full mb-6">
            <PasswordField handleFieldChange={handleFieldChange} />
          </div>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="userType" className="text-gray-700 mb-2">User Type</label>
            <select
              id="userType"
              name="userType"
              value={data.userType}
              onChange={handleFieldChange}
              className="select select-bordered mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User Type</option>
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="phone" className="text-gray-700 mb-2">Phone</label>
            <input
              name="phone"
              onChange={handleFieldChange}
              type="phone"
              className="input input-bordered w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSignUp}
            className={`w-full py-3 mb-4 text-white font-bold rounded ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : 'Sign Up'}
          </button>
          <div className="mt-10">
            <p className="text-gray-600">
              {'Already have an account? '}
              <Link to="/login" className="text-blue-500 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="hidden lg:block float-left h-screen lg:w-[60%] bg-green-300">
        <img className="w-full h-full object-cover" src={farm} alt="Farm" />
      </section>
    </>
  );
}

export default SignUp;
