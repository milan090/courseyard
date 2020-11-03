import React, { useEffect } from "react";
import Signup from "../../layouts/signup/signup.layout";

const SignupPage = () => {
  useEffect(() => {
    document.title = "Courseyard | Sign Up";
  });
  return (
    <>
      <div className="flex flex-col justify-items-center items-center px-10 py-10 bg-accent w-full">
        <Signup />
      </div>
    </>
  );
};

export default SignupPage;
