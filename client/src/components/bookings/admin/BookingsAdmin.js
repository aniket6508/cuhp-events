import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";
import BookingCardAdmin from "./BookingCardAdmin";
import BookingColumn from "../BookingColumn";
import FilterOptionsTab from "../FilterOptionsTab";
import VerifyUser from "../../auth/verification/VerifyUser";

const BookingsAdmin = () => {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("Approved By HOD");

  const [emailVerified, setEmailVerified] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const openModal = (bookingId) => {
    setShowModal(true);
    setSelectedBookingId(bookingId);
  };

  const closeModal = () => {
    setShowModal(false);
    setRejectionReason("");
    setSelectedBookingId("");
  };

  const userContact = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getdata`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setUserData(data);
      if (data.emailVerified) {
        setEmailVerified(true);
      }

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const getBookingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/bookingsAdmin`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      const sortedBookingData = data.bookings.sort((a, b) => {
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setBookingData(sortedBookingData);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: "Unauthrized",
        });
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getBookingData();
  }, []);

  const updateBooking = async (bookingId, isApproved) => {
    if (isApproved === "Rejected By Admin") {
      if (rejectionReason.trim() === "") {
        toast.error("Please provide a reason for rejection.");
        return;
      } else {
        setRejectionReason(null);
      }
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/bookingsEdit/${bookingId}`,
        {
          isApproved: isApproved,
          rejectionReason:
            isApproved === "Approved By Admin" ? null : rejectionReason,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      closeModal();
      getBookingData();

      toast.success(`Request ${isApproved} Successfull!`);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const filteredBookings = Object.values(bookingData).filter((bookingData) => {
    if (filterValue === "Request Sent") {
      return bookingData.isApproved === "Request Sent";
    } else if (filterValue === "Approved By HOD") {
      return bookingData.isApproved === "Approved By HOD";
    } else if (filterValue === "Approved By Admin") {
      return bookingData.isApproved === "Approved By Admin";
    } else if (filterValue === "Rejected By HOD") {
      return bookingData.isApproved === "Rejected By HOD";
    } else if (filterValue === "Rejected By Admin") {
      return bookingData.isApproved === "Rejected By Admin";
    } else if (filterValue === "My Requests") {
      return bookingData.email === userData.email;
    } else {
      return bookingData;
    }
  });
  const handleEditClick = (bookingId) => {
    navigate(`/bookingsEdit/${bookingId}`);
  };

  const handleViewClick = (bookingId) => {
    navigate(`/bookingsView/${bookingId}`);
  };
  return (
    <>
      <div className="mt-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Booking<span className="text-indigo-700"> Requests</span>{" "}
        </h1>

        <div className="flex flex-wrap my-8 justify-center">
          <FilterOptionsTab
            handleFilter={handleFilter}
            filterValue={filterValue}
          />
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md w-1/3">
              <h2 className="text-lg font-bold mb-4">Reason for Rejection</h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
                placeholder="Enter reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              ></textarea>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                  onClick={() =>
                    updateBooking(selectedBookingId, "Rejected By Admin")
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : !emailVerified ? (
          <div className="flex items-center flex-col my-12 justify-center  ">
            <VerifyUser />
          </div>
        ) : (
          <div className="container w-full px-4 mx-auto sm:px-8 ">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 ">
              <div className="inline-block min-w-full border overflow-hidden rounded-lg  shadow-xl shadow-blue-100 ">
                <table className="min-w-full leading-normal    ">
                  <thead>
                    <BookingColumn />
                  </thead>
                  <tbody>
                    {Array.isArray(filteredBookings) &&
                    filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <BookingCardAdmin
                          key={booking._id}
                          booking={booking}
                          updateBooking={updateBooking}
                          handleViewClick={handleViewClick}
                          handleEditClick={handleEditClick}
                          openModal={openModal}
                          filterValue={filterValue}
                        />
                      ))
                    ) : (
                      <tr className="border-gray-200 border-b justify-center">
                        <td
                          className="px-5 py-5 font-bold text-m bg-white border-gray-200 text-center"
                          colSpan="7"
                        >
                          <p className="text-gray-900 whitespace-no-wrap">
                            No Bookings Requests found.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingsAdmin;
