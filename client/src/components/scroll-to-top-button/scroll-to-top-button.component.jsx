import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import "./scroll-to-top-button.styles.css";

function ScrollToTopButton() {
  const [display, setDisplay] = useState("hidden");
  const [active, setActive] = useState("");

  const toTop = () => {
    /*
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
        */
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const getDisplay = () => {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
      setDisplay("block");
      setActive("active");
    } else {
      setDisplay("hidden");
      setActive("notactive");
    }
  };

  useEffect(() => {
    window.onscroll = function () {
      getDisplay();
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <button
      className={`totop fixed ${display} ${active} shadow-md focus:outline-none bottom-0 z-40 text-2xl right-0 bg-primary w-12 h-12 my-5 mx-5 rounded-full font-display font-bold hover:text-white`}
      onClick={toTop}
    >
      <FontAwesomeIcon icon={faAngleUp} />
    </button>
  );
}

export default ScrollToTopButton;
