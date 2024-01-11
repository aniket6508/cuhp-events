import React from "react";
import { Link } from "react-router-dom";

const VerifyUser = () => {
  return (
    <>
      <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">
        Looks Like Yout Have Not Verified Your Email!
      </h1>
      <p className="py-4 text-xl text-gray-800">
        Please click on the below button and verify email before booking.
      </p>
      <div>
        <Link to="/profile">
          <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
            Verify Email
          </button>
        </Link>
      </div>
    </>
  );
};

export default VerifyUser;
