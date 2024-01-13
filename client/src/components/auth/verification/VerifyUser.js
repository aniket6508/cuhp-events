import React from "react";
import { Link } from "react-router-dom";

const VerifyUser = () => {
  return (
    <>
      {/* Heading indicating that the user needs to verify their email */}
      <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">
        Looks Like You Have Not Verified Your Email!
      </h1>
      {/* Message guiding the user to click the button to verify email before booking */}
      <p className="py-4 text-xl text-gray-800">
        Please click on the below button to verify your email before booking.
      </p>
      <div>
        {/* Button linking to the user's profile for email verification */}
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
