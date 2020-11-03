import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({ children, className, ...otherProps }) => (
  <button
    className={`bg-primary border border-primary text-gray-900 focus:outline-none hover:bg-secondary hover:text-primary font-semibold py-1 rounded-md font-display ${className}`}
    {...otherProps}
  >
    {children}
  </button>
);

CustomButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CustomButton;
