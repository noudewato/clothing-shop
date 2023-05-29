import React, { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../../utlis/firebase/firebase.utils";
import FormInput from "../../form-input/form-input.component";
import "./signin.styles.scss";
import Button from "../../button/button.component";

const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("password does not match with this email");
          break;
        case "auth/user-not-found":
          alert("user not found, try again");
          break;
        default:
          console.log(error);
      }
    }
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="signin-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="button-group-container">
          <Button type="submit">SIGN IN</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
