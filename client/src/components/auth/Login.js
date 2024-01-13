import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../App";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";

const Login = () => {
  // Get the dispatch function from the UserContext
  const { dispatch } = useContext(UserContext);
  
  // State to handle loading state
  const [isLoading, setIsLoading] = useState(false);

  // Navigation hook for redirecting after login
  const navigate = useNavigate();

  // State for email, password, and authentication status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");

  // Function to handle user login
  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make a POST request to the server for user login
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Extract data from the response
      const data = response.data;

      // Save token to local storage
      localStorage.setItem("jwtoken", data.token);

      // Dispatch actions to update user and user type in context
      dispatch({ type: "USER", payload: true });
      if (data.userLogin.userType === "admin") {
        dispatch({ type: "USER_TYPE", payload: "admin" });
      } else if (data.userLogin.userType === "hod") {
        dispatch({ type: "USER_TYPE", payload: "hod" });
      } else {
        dispatch({ type: "USER_TYPE", payload: "faculty" });
      }

      // Save user ID to local storage
      localStorage.setItem("userId", data.userLogin._id);
      toast.success("Login Successful");
      setIsLoading(false);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      // Handle errors during login
      if (error.response.status === 400 && error.response) {
        const data = error.response.data;
        setIsLoading(false);
        setAuthStatus(data.error);
      } else {
        setAuthStatus("Something Went Wrong");
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* Render loading spinner if loading, otherwise render login form */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font min-h-screen flex items-center justify-center bg-white">
          <div className="lg:w-2/6 md:w-1/2  bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
            {/* Login Form */}
            <form method="POST">
              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Sign <span className="text-indigo-600">In</span>
              </h3>

              {/* Email Input */}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
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
                  placeholder="Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Password Input */}
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
                >
                  Password
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

              {/* Authentication Status */}
              <div className="my-4">
                <p className="text-s text-red-600 font-bold">{authStatus}</p>
              </div>

              {/* Forgot Password Link */}
              <div className="my-4">
                <Link
                  to="/passwordReset"
                  className=" text-m font-bold  hover:underline"
                >
                  Forgot Your Password?
                </Link>
              </div>

              {/* Login Button */}
              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={loginUser}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-4 text-center">
                <p className="text-m">
                  Don't have an account yet?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    {" "}
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
