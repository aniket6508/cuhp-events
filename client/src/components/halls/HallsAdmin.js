import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import HallCardAdmin from "./HallCardAdmin";

const HallsAdmin = () => {
  const navigate = useNavigate();
  const [hallData, setHallData] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedHallId, setSelectedHallId] = useState("");
  const [selectedHallName, setSelectedHallName] = useState("");

  const callAboutPage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/about`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      setUserData(data);

      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: "Unauthrized",
        });
        navigate("/login");
      }
    }
  };

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

      setHallData(data.halls);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    callAboutPage();
    getHallsData();
  }, []);

  const handleDeleteClick = async (hallId) => {


    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/halls/${hallId}`,

        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data) {
        toast.error("Request not send!");
      } else {
        getHallsData();
        toast.success("Hall Deleted Successfull!");
        setShowModal(false);
        setSelectedHallId("");
        setSelectedHallName("");
        navigate("/halls");
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        const data = error.response.data;
      } else {
        console.error(error);
      }
      console.log(error);
    }
  };

  const handleBookingClick = (hallId, hallName) => {
    navigate(`/bookingForm/${hallId}/${hallName}`);
  };

  const handleEditClick = (hallId, hallName) => {
    navigate(`/halls/${hallId}/${hallName}`);
  };
  const handleDeleteModal = (hallId, hallName) => {
    setSelectedHallId(hallId);
    setSelectedHallName(hallName);
    setShowModal(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-6 min-h-screen">
          <div className="py-5 md:py-0 flex container mx-auto px-6 justify-between  items-center">
            <div className="mx-auto ">
              <h1 className="text-xl  sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
                Available <span className="text-indigo-700"> Halls</span>{" "}
              </h1>
            </div>
            <Link to="/hallForm">
              <button className="flex self-end focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700  md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700  sm:px-8 py-1 sm:py-3 text-sm">
                Create Hall
              </button>
            </Link>
          </div>

          {Array.isArray(hallData) && hallData.length > 0 ? (
            hallData.map((hall) => (
              
              <HallCardAdmin hall={hall} handleBookingClick={handleBookingClick} userData={userData} handleEditClick={handleEditClick} handleDeleteModal={handleDeleteModal}/>
            ))
          ) : (
            <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
              No halls found.
            </h2>
          )}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete {selectedHallName}?
            </h2>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg focus:outline-none"
                onClick={() => handleDeleteClick(selectedHallId)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HallsAdmin;
