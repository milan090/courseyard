import React from "react";

import "./switch.styles.scss";

const Switch = ({ ...otherProps }) => {
  return (
    <div className="px-2 py-2 text-center rounded-md mx-6">
      <label htmlFor="toogle" className="cursor-pointer">
        <div className="relative">
          <input id="toogle" type="checkbox" className="hidden" {...otherProps} />
          <div className="toggle__line absolute w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="toggle__dot relative w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
