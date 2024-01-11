import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export const RenderUser = () => {
  const { state } = useContext(UserContext);

  if (state.userType === "admin") {
    return (
      <div>
        <Link to="/halls">Halls</Link>
      </div>
    );
  } else if (state.userType === "faculty") {
    return (
      <div>
        <Link to="/bookings">Bookings</Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/halls">Halls</Link>
      </div>
    );
  }
};


export const RenderMenu = () => {
    const { state } = useContext(UserContext);
  if (state.user) {
    return (
      <>
        <Link to="/logout">
          <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700  md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  px-8 py-1 sm:py-3 text-sm">
            Logout
          </button>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link to="/login">
          <button className="focus:outline-none lg:text-lg font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700  md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  px-8 py-1 sm:py-3 text-sm">
            Sign In / Sign Up
          </button>
        </Link>
      </>
    );
  }
};
