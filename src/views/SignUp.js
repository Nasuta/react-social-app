import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./SignUp.css";
import axios from "axios";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpMessage, setSignUpMessage] = useState();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  useEffect(() => {
   
    if (hasSignedUp) {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSignUpMessage("");
      setIsSigningUp(false);
      setHasSignedUp(false);
    }
  }, [hasSignedUp]);



  const validate = () => {
    let validationErrors = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    // Username
    if (formData.username.length < 4) {
      validationErrors.username = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username should have at least 4 characters.",
      }));
    } else if (!/^[^\s]*$/.test(formData.username.trim())) {
      validationErrors.username = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username should not contain whitespace.",
      }));
    } else {
      validationErrors.username = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }

    // Email
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
        formData.email.trim()
      )
    ) {
      validationErrors.email = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
    } else {
      validationErrors.email = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    // Password
    if (formData.password.trim().length < 6) {
      validationErrors.password = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should have at least 6 characters.",
      }));
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(formData.password.trim())
    ) {
      validationErrors.password = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
      }));
    } else {
      validationErrors.password = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    // Confirm Password
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = true;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      validationErrors.confirmPassword = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }

    return (
      !validationErrors.username &&
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.confirmPassword
    );
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate() || isSigningUp) {
      return;
    }

    setIsSigningUp(true);

    if (props.user && props.user.username === formData.username) {
      setSignUpMessage("User already signed up");
      // setIsSigningUp(false);
      return;
    }

    axios
      .post("https://akademia108.pl/api/social-app/user/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);

        let resData = res.data;
        if (resData.signedup) {
          setSignUpMessage("Account created");
          // setHasSignedUp(true); 
        } else {
          if (resData.message.username) {
            setSignUpMessage(resData.message.username[0]);
          } else if (resData.message.email) {
            setSignUpMessage(resData.message.email[0]);
        }
        
      }
      // setIsSigningUp(false);
      })
      .catch((error) => {
        console.error(error);
        // setIsSigningUp(false);
      })

      .finally(() => {
        setIsSigningUp(false);
      });

    console.log("Form submitted");
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);
  };

  return (
    <div>
      <div className="signUp">
        {props.user && <Navigate to="/" />}
        <form onSubmit={handleSubmit}>
          {signUpMessage && <h2>{signUpMessage}</h2>}
          {errors.username && <p>{errors.username}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />

          {errors.password && <p>{errors.password}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <button className="btn" type="submit" >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
{/* <button className="btn" type="submit" disabled={isSigningUp}> */}