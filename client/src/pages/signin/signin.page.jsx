import React, { useEffect } from "react";
import Signin from "../../layouts/signin/signin.layout";
import Signup from "../../layouts/signup/signup.layout";

const SigninPage = () => {
  useEffect(() => {
    document.title = "Courseyard | Sign In";
  });

  return (
    <div className="bg-accent pb-8">
      <div className="lg:px-20 xl:px-40 grid grid-flow-col lg:grid-cols-2 pt-10 justify-items-center">
        <div className="">
          <Signin />
        </div>
        <div className="hidden lg:block">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
