import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ForgotPassword = () => {
  // Hook to handle navigation
  const navigate = useNavigate();

  // State to manage new password and confirm new password
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  // State to manage loading state, authentication status, and URL parameters
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");
  const { id, token } = useParams();

  // Function to check if the user is valid
  const userValid = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/forgotPassword/${id}/${token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (error.response.status === 401 && error.response) {
        // Handle expired link, show error toast, and navigate to password reset page
        toast.error("Link Expired. Reset Again!", {
          toastId: "Unauthorized",
        });
        navigate("/passwordReset");
      }
    }
  };

  // Effect to check user validity on component mount
  useEffect(() => {
    userValid();
  }, []);

  // Function to send the new password
  const sendPassword = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Make a POST request to change the password
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/${id}/${token}`,
        {
          password,
          cpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.status === 201) {
        // Password changed successfully, show success toast and navigate to login page
        setIsLoading(false);
        toast.success("Password Changed Successfully!");
        navigate("/login");
      } else {
        // Handle invalid user case
        console.log("User Invalid");
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response.status === 401 && error.response) {
        // Unauthorized error (e.g., invalid token), show appropriate error message
        const data = error.response.data;
        setAuthStatus(data.error);
      } else if (error.response.status === 422 && error.response) {
        // Validation error, show validation error message
        const data = error.response.data;
        setAuthStatus(data.error);
      } else {
        // Other errors, show a generic error message and log the error
        setAuthStatus("Something Went Wrong");
        console.log(error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font h-screen flex items-center justify-center bg-white">
          <div className="lg:w-2/6 md:w-1/2 bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
            <form method="POST">
              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Reset <span className="text-indigo-600">Password</span>
              </h3>

              {/* New Password Input */}
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  New Password
                </label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Confirm New Password Input */}
              <div className="relative mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Confirm New Password
                </label>
                <input
                  required
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Authentication Status Display */}
              <div className="my-4">
                <p className="text-s text-red-600 font-bold">{authStatus}</p>
              </div>

              {/* Submit Button */}
              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={sendPassword}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold hover:bg-indigo-800 rounded text-lg"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
