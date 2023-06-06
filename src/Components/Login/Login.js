import React, { useState } from "react";
import "./Login.css";
import { LoginAPI } from "../../service/Api";
import { storeUserData } from "../../service/Storage";
import { Navigate, Link } from "react-router-dom";
import { isAuthenticated } from "../../service/Auth";

const Login = () => {
  const initialState = {
    email: { required: false },
    password: { required: false },
    customErrorMessage: null,
  };

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [validation, setvalidation] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const login = (event) => {
    event.preventDefault();
    let error = initialState;
    let ifError = false;
    if (input.email.length === 0) {
      error.email.required = true;
      ifError = true;
    }
    if (input.password.length === 0) {
      error.password.required = true;
      ifError = true;
    }
    setvalidation(error);
    console.log(validation);
    if (!ifError) {
        setLoading(true);
        LoginAPI(input)
          .then((response) => {
            storeUserData(response.data.idToken);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.error.message) {
                setvalidation({
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

  if(isAuthenticated()){
    return <Navigate to="/dashboard"/>
  }

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <section className="login-block">
      <div className="container">
        <div className="row ">
          <div className="col login-sec">
            <h2 className="text-center">Login Now</h2>
            <form onSubmit={login} className="login-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Email
                </label>
                <input
                  type="email"
                  onChange={handleInput}
                  className="form-control"
                  name="email"
                  id=""
                  placeholder="email"
                />
                {validation.email.required ? (
                  <span className="text-danger">Email is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Password
                </label>
                <input
                  onChange={handleInput}
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password"
                  id=""
                />
                {validation.password.required ? (
                  <span className="text-danger">Password is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <div className="text-center">
                  {loading ? (
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : null}
                </div>
                {validation.customErrorMessage ? (
                  <span className="text-danger">
                    <p>{validation.customErrorMessage}</p>
                  </span>
                ) : null}
                <input
                  type="submit"
                  className="btn btn-login float-right"
                  value="Login"
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Create new account ? Please <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
