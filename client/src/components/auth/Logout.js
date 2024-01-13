import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../../App';
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const Logout = () => {
  // Access the dispatch function from the UserContext
  const { dispatch } = useContext(UserContext);

  // State to handle loading state during logout
  const [isLoading, setIsLoading] = useState(true);

  // Navigation hook for redirecting after logout
  const navigate = useNavigate();

  // Get the user ID from local storage
  const userId = localStorage.getItem("userId");

  // Function to handle user logout
  const logoutUser = async () => {
    try {
      // Make a GET request to the server for user logout
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout/${userId}`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });

      if (res.status === 200) {
        // Dispatch actions to reset user and user type in context
        dispatch({ type: "USER", payload: null });
        dispatch({ type: "USER_TYPE", payload: null });

        // Clear localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("jwtoken");

        // Show success message
        setIsLoading(false);
        toast.success("Logout Successful", {
          toastId: 'logout',
        });

        // Navigate to login page
        navigate("/login", { replace: true });
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Effect hook to call logoutUser on component mount
  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <>
      {/* Display loading spinner while logging out */}
      {isLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default Logout;
