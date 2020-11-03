import React, { useState } from "react";
import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { signInWithGoogle, loginUserEmailPassword } from "../../firebase/firebase.utils";
import { Link, useHistory } from "react-router-dom";
import "./signin.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (!email) {
      return setEmailError("This is required");
    } else if (!password) {
      return setPasswordError("This is required");
    }

    if (!/\w+@\w+\.\w+/.test(email)) return setEmailError("Invalid email");

    setSignInLoading(true);
    loginUserEmailPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setSignInLoading(false);
        setUserError("Email or password doesn't match");
        console.error(err);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="text-primary flex flex-col p-5 max-w-sm">
      <h1 className="text-3xl font-display font-semibold mb-10">Sign In</h1>
      <CustomInput
        type="email"
        onChangeHandler={(e) => setEmail(e.target.value)}
        value={email}
        name="Email"
        hasError={!!emailError}
      >
        <div className="font-display text-red-500">{emailError}</div>
      </CustomInput>
      <CustomInput
        type="password"
        onChangeHandler={(e) => setPassword(e.target.value)}
        value={password}
        name="Password"
        hasError={!!passwordError}
      >
        <div className="font-display text-red-500">{passwordError}</div>
      </CustomInput>
      <CustomButton
        className="font-display text-gray-900 mr-auto ml-auto w-full "
        type="submit"
        onClick={handleSubmit}
      >
        <Spinner isLoading={signInLoading} height="h-6" width="w-6">
          Sign In
        </Spinner>
      </CustomButton>
      <div className="font-display text-red-500">{userError}</div>
      <span className="text-left font-thin font-display mr-auto ml-auto mb-5 mt-5">
        Not Registered yet?{" "}
        <Link to="/signup" className="text-secondary font-semibold hover:underline">
          Signup Now!
        </Link>
      </span>
      <div className="px-5 mb-3 w-full flex justify-center">
        <div className="bars h-px w-24 bg-gray-500"></div>
        <div className="mb-2 mr-auto ml-auto">or</div>
        <div className="bars h-px w-24 bg-gray-500"></div>
      </div>
      <CustomButton
        className="my-2 font-display text-gray-900 mr-auto ml-auto w-full"
        onClick={handleGoogleSignIn}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          className="mb-px w-5 h-5 inline mr-3"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
        Sign In with Google
      </CustomButton>
    </div>
  );
};

export default Signin;
