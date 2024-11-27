import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import PropTypes from 'prop-types';

const Password = ({ handleFieldChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="password">Password</label>
      <div className="flex flex-row items-end">
        <input
          name="password"
          onChange={handleFieldChange}
          type={passwordVisible ? 'text' : 'password'}
          className="input input-bordered w-full mt-2"
        />
        <button
          className="ml-2 btn btn-primary"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <BiHide /> : <BiShow />}
        </button>
      </div>
    </div>
  );
};

PasswordField.propTypes = {
  handleFieldChange: PropTypes.func.isRequired
};

export default Password;
