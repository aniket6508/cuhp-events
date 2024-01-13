import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import verisuccess from "../../../assets/verification success.jpg";
import verifail from "../../../assets/verification fail.png";

const VerifySuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const { id, token } = useParams();

  // Function to validate user verification status
  const userValid = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/verifyEmail/${id}/${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      setIsLoading(false);
      if (data.status === 201) {
        setAuthStatus(true);
        toast.success("Email Verified Successfully", {
          toastId: "successfull",
        });
      } else {
        console.log("user invalid");
      }
    } catch (error) {
      if (
        (error.response.status === 401 || error.response.status === 500) &&
        error.response
      ) {
        setAuthStatus(false);
        setIsLoading(false);

        toast.error("Verification Link Expired, Please Verify Again!", {
          toastId: "Unauthrized",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : !authStatus ? (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
          <div className="w-full lg:w-1/2">
            <img alt="error" className="hidden lg:block" src={verifail} />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">
              Verification Link Has Expired!
            </h1>
            <p className="py-4 text-xl text-gray-800">
              Please click the button below to verify again.
            </p>
            <div>
              <Link to="/about">
                <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Verify Again
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
          <div className="w-full lg:w-1/2">
            <img alt="success" className="hidden lg:block" src={verisuccess} />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">
              Verification Successful!
            </h1>
            <p className="py-4 text-xl text-gray-800">
              Please click the button below to go back to the homepage.
            </p>
            <div>
              <Link to="/">
                <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Go back to Homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifySuccess;
