import React, { useState } from "react";
import "./Register.css";
import { registerAPI } from "../../service/Api";
import { storeUserData } from "../../service/Storage";
import { isAuthenticated } from "../../service/Auth";
import { Link, Navigate } from "react-router-dom";
const Register = () => {
  const initialState = {
    nameValidation: false,
    emailValidation: false,
    passwordValidation: false,
    customErrorMessage: null,
  };

  const [validation, setValidation] = useState(initialState);

  const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleInputs = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    let error = initialState;
    let hasError = false;
    if (input.name.length === 0) {
      error.nameValidation = true;
      hasError = true;
    }
    if (input.email.length === 0) {
      error.emailValidation = true;
      hasError = true;
    }
    if (input.password.length === 0) {
      error.passwordValidation = true;
      hasError = true;
    }
    setValidation(error);
    if (hasError != true) {
      setLoading(true);
      registerAPI(input)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error.message) {
            setValidation({
              ...validation,
              customErrorMessage: err.response.data.error.message,
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const [loading, setLoading] = useState(false);

  if(isAuthenticated()){
    return <Navigate to="/dashboard"/>
  }

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form onSubmit={submitForm} className="register-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name:</label>

                <input
                  autoComplete="off"
                  type="text"
                  onChange={handleInputs}
                  className="form-control"
                  name="name"
                />

                {validation.nameValidation && (
                  <span className="text-danger">Name is required.</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email:</label>

                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleInputs}
                  className="form-control"
                  name="email"
                />

                {validation.emailValidation && (
                  <span className="text-danger">Email is required.</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password:</label>

                <input
                  autoComplete="off"
                  className="form-control"
                  type="password"
                  onChange={handleInputs}
                  name="password"
                />

                {validation.passwordValidation && (
                  <span className="text-danger">Password is required.</span>
                )}
              </div>

              <div className="form-group">
                <span className="text-danger">
                  {validation.customErrorMessage && (
                    <p>{validation.customErrorMessage}</p>
                  )}
                </span>
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                <input
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary "
                  value="Register"
                />
              </div>
              <br />
              <br />
              <div className="clearfix"></div>
              <div className="">
                Already have an account? Please <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
