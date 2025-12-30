import { useState } from 'react';

function PasswordField({ handleFieldChange, name = 'password' }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-gray-700 mb-2">
        Password
      </label>
      <div className="relative">
        <input
          name={name}
          onChange={handleFieldChange}
          type={showPassword ? 'text' : 'password'}
          className="input input-bordered w-full p-2 pr-10 border border-warm-brown rounded focus:outline-none focus:ring-2 focus:ring-sage-green"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-earth-brown hover:text-forest-green"
        >
          <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
      </div>
    </div>
  );
}

export default PasswordField;

