import React from 'react';
import PropTypes from 'prop-types';

const ButtonLoader = ({ size }) => {
  return (
    <div className={`loader ${size}`}></div>
  );
};

ButtonLoader.propTypes = {
  size: PropTypes.string
};

export default ButtonLoader;