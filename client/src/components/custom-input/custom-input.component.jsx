import React from "react";
import PropTypes from "prop-types";

import "./custom-input.styles.scss";

const CustomInput = ({
  onChangeHandler,
  type,
  name,
  value,
  className,
  children,
  hasError,
  ...otherProps
}) => (
  <div className="h-20">
    <div className="custom-input my-1">
      <input
        type={type || "text"}
        onChange={onChangeHandler}
        {...otherProps}
        className={`w-full focus:outline-none border-gray-500 bg-transparent border-b-2 custom-input-field ${
          type === "password" ? "tracking-ultra-wide" : ""
        } ${hasError ? "border-red-500" : "focus:border-primary"} ${className}`}
      />
      <label
        htmlFor={name}
        className={`custom-input-label font-display ${
          value ? "custom-input-small-label" : ""
        }`}
      >
        {name}
      </label>
    </div>
    <div className="text-sm pl-1">{children}</div>
  </div>
);

CustomInput.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  hasError: PropTypes.bool,
};

export default CustomInput;
