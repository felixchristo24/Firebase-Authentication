import React, { useEffect, useState } from "react";
import { getUser } from "../../service/Api";
import NavBar from "../NavBar/Navbar";
import { isAuthenticated } from "../../service/Auth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    localId: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      getUser().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />

      <main role="main" className="container mt-5">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>

            {user.name && user.email && user.localId ? (
              <div>
                <p className="text-bold ">
                  Hi {user.name}, your Firebase ID is {user.email}
                </p>
                <p>ID:{user.localId}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
