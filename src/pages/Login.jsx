import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonLoader from '../components/ButtonLoader';
import farm from '../assets/farm.jpg';
import icon from '../assets/logo.png';
import PasswordField from '../components/PasswordField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email.length === 0) {
      toast.error('Enter your email to login 😥');
      return;
    }

    if (password.length === 0) {
      toast.error('Enter your password to login 😥');
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
      toast.success('Login successful!');
    }, 2000);
  };

  return (
    <>
      <section className="float-right relative h-screen w-screen lg:w-[40%] bg-white flex items-center justify-center">
        <div className="absolute right-3 top-3">
          <img className="h-[75px] object-contain mr-1" src={icon} alt="Logo" />
        </div>
        <div className="flex flex-col items-center justify-center px-8 max-w-lg mx-auto bg-green-100 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-black text-gray-800 mb-4">Welcome to FreshNest</h1>
          <p className="font-extralight text-gray-600 mb-8">Please enter your details</p>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="email" className="text-gray-700 mb-2">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              type="email"
              className="input input-bordered w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-full mb-6">
            <PasswordField handleFieldChange={(e) => setPassword(e.target.value)} />
          </div>
          <button
            onClick={handleLogin}
            className={`w-full py-3 mb-4 text-white font-bold rounded ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : 'Login'}
          </button>
          <Link to="/" className="w-full">
            <button className="w-full py-3 mb-4 text-white font-bold rounded bg-green-500 hover:bg-green-700">
              Login
            </button>
          </Link>
          <div className="mt-10">
            <p className="text-gray-600">
              {"Don't have an account? "}
              <Link to="/SingUp" className="text-blue-500 font-bold">
                Sign up
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

export default Login;