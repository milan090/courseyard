import React, { useEffect } from "react";
import "./not-found.styles.scss";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Courseyard | Page Not Found";
  });

  return (
    <>
      <hr />
      <div className="mr-auto ml-auto mt-10 w-full text-center">
        <span className="error-code text-primary font-bold">
          4<span className="zero text-accent">0</span>4
        </span>
        <span className="error-msg text-primary font-extrabold font-display block">
          PAGE NOT FOUND
        </span>
        <span className="extended-error-msg font-display text-base mt-10 mb-10 block font-light text-primary w-11/12 lg:w-1/2 md:w-1/2 mr-auto ml-auto">
          Sorry, the page you&apos;re looking for might have been removed or doesn&apos;t
          exist.
        </span>
      </div>
      <hr />
    </>
  );
};

export default NotFoundPage;
