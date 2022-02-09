import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserService from "../services/userService";
import { useDispatch } from "react-redux";
import { getUsers } from "../store/users";

function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("users"));
    setLoading(true);
    if (users) {
      dispatch(getUsers(users));
      setLoading(false);
    } else {
      UserService.getUsers()
        .then((response) => {
          dispatch(getUsers(response.data));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Errors", error);
        });
    }
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <p className="font-semibold text-lg m-5">Loading. Please wait...</p>
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <nav className="bg-gray-800 text-white p-5">
            <h1 className="font-semibold text-3xl mb-4">Dashboard</h1>
          </nav>
          <Outlet />
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
