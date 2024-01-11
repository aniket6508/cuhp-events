import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import HallCard from "./HallCard";

const Halls = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getHallsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/halls`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setUserData(data.halls);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getHallsData();
  }, []);

  const handleBookingClick = (hallId, hallName) => {
    navigate(`/bookingForm/${hallId}/${hallName}`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 min-h-screen">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
            Available <span className="text-indigo-700"> Halls</span>{" "}
          </h1>

          {Array.isArray(userData) && userData.length > 0 ? (
            userData.map((hall) => (
              <HallCard
                key={hall._id}
                hall={hall}
                handleBookingClick={handleBookingClick}
              />
            ))
          ) : (
            <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
              No halls found.
            </h2>
          )}
        </div>
      )}
    </>
  );
};

export default Halls;
