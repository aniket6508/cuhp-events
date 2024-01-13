import React, { useState } from "react";

import LoadingSpinner from "../../LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordReset = () => {
  // State to manage email input, loading state, and authentication status
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState("");

  // Function to handle the password reset request
  const forgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make a POST request to the server for password reset
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/passwordLink`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data) {
        // Reset loading state, show success message, and reset email input and authStatus
        setIsLoading(false);
        setAuthStatus("Please Check Your Email");
        toast.success("Email Sent Successfully");
        setEmail("");
        setAuthStatus("");
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response.status === 400 && error.response) {
        // Validation error, show validation error message
        const data = error.response.data;
        setIsLoading(false);
        setAuthStatus(data.error);
      } else {
        // Other errors, show a generic error message and log the error
        setAuthStatus("Something Went Wrong");
        console.log(error.response.data);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font h-screen flex items-center justify-center bg-white">
          <div className="lg:w-2/6 md:w-1/2  bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
            <form method="POST">
              {/* Title */}
              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Forget <span className="text-indigo-600">Password</span>
              </h3>

              {/* Email Input */}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-s font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
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
                    onClick={forgotPassword}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg"
                  >
                    Send
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

export default PasswordReset;
