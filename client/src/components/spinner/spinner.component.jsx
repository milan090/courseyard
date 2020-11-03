import React from "react";
import PropTypes from "prop-types";
import "./spinner.styles.scss";

const Spinner = ({ children, isLoading, width, height, className }) => (
  <div>
    {isLoading ? (
      <div className={`spinner-overlay ${className}`}>
        <div className={`spinner ${width}  ${height}`}></div>
      </div>
    ) : (
      children
    )}
  </div>
);

Spinner.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Spinner;
