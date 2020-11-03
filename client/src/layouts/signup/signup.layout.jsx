import React, { useState } from "react";
import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { createUserWithEmailPassword } from "../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";

import "./signup.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

const Signup = () => {
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userError, setUserError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\w+@\w+\.\w+/.test(email)) {
      return setEmailError("Invalid email");
    } else if (emailError.length > 1) {
      setEmailError("");
    }

    if (password.length < 6) {
      if (passwordError.indexOf("Passwords don't match")) {
        return setPasswordError("Password too short");
      }
    } else if (password !== confirmPassword) {
      return setPasswordError("Passwords don't match");
    } else {
      setPasswordError("");
    }

    try {
      setSignUpLoading(true);
      await createUserWithEmailPassword(email, password);
      setSignUpLoading(false);
      history.push("/");
    } catch (error) {
      setSignUpLoading(false);
      if (error.exists) {
        return setUserError("User exists");
      }
    }
  };

  return (
    <form className="text-primary flex flex-col p-5 w-full" id="sign-up-layout">
      <h1 className="text-3xl font-display font-semibold mb-10">Sign Up</h1>
      <CustomInput
        type="email"
        onChangeHandler={(e) => setEmail(e.target.value)}
        value={email}
        name="Email"
        hasError={!!emailError || !!userError}
      >
        <div className="font-display text-red-500">{emailError}</div>
        <div className="font-display text-red-500">{userError}</div>
      </CustomInput>
      <CustomInput
        type="password"
        onChangeHandler={(e) => setPassword(e.target.value)}
        value={password}
        name="Password"
        hasError={!!passwordError}
      >
        <div className="font-display text-red-500 text-sm">{passwordError}</div>
      </CustomInput>
      <CustomInput
        type="password"
        onChangeHandler={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        name="Confirm Password"
      ></CustomInput>
      <CustomButton className="text-gray-900 w-full mr-auto ml-auto" onClick={handleSubmit}>
        <Spinner isLoading={signUpLoading} height="h-6" width="w-6">
          Sign Up
        </Spinner>
      </CustomButton>
    </form>
  );
};

export default Signup;
