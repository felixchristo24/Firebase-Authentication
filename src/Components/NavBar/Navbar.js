import React from "react";
import { isAuthenticated } from "../../service/Auth";
import { Link, useNavigate } from "react-router-dom";
import { gremoveUserID } from "../../service/Storage";

const NavBar = () => {

const navigate = useNavigate();
    const logout = () => {
        gremoveUserID();
        navigate('/login');
    }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Chris
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticated ? (
            <li className="nav-item">
              <Link to="/" className="nav-link">Register</Link>
            </li>
          ) : null}
         {!isAuthenticated ? (
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          ) : null}
         {isAuthenticated ? (
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          ) : null}
        {isAuthenticated ? (
            <li className="nav-item">
              <a onClick={logout} className="nav-link">Logout</a>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
