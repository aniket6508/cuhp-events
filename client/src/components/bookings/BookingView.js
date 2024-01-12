import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingSpinner from "../LoadingSpinner";
import { parseISO, format } from "date-fns";

import { UserContext } from "../../App";
import { RequestSent } from "../stepsOptions/RequestSent";
import { ApprovedByAdmin } from "../stepsOptions/ApprovedByAdmin";
import { ApprovedByHod } from "../stepsOptions/ApprovedByHod";
import { RejectedByHod } from "../stepsOptions/RejectedByHod";
import { RejectedByAdmin } from "../stepsOptions/RejectedByAdmin";

import { DepartmentList, InstitutionList } from "../InstitutionDeptartmentList";
const BookingsView = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { state } = useContext(UserContext);

  const openModal = (bookingId) => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setRejectionReason("");
  };

  const getbookingById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/bookingsView/${bookingId}`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.booking;
      setBookingData(data);
      setIsLoading(false);
    } catch (error) {
      navigate("/");
    }
  };

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
      getbookingById();

      toast.success(`Request ${isApproved} Successfull!`);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {}
  };

  const handleEditClick = (bookingId) => {
    navigate(`/bookingsEdit/${bookingId}`);
  };

  useEffect(() => {
    getbookingById();
  }, []);

  const institutionName =
    InstitutionList[bookingData.institution] || bookingData.institution;
  const departmentName =
    DepartmentList[bookingData.department] || bookingData.department;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="max-w-screen-md mx-auto p-5 my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="text-center mb-16">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                View Booking
              </p>
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                View <span className="text-indigo-600">Booking </span>
              </h3>
            </div>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-event-manager"
                  >
                    Event Coordinator Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-manager"
                  >
                    {bookingData.eventManager}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-name"
                  >
                    Event Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name"
                  >
                    {bookingData.eventName}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-organizing-club"
                  >
                    Organizing Club
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-organizing-club"
                  >
                    {bookingData.organizingClub}
                  </p>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-event-date"
                  >
                    Event Date Type
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date"
                  >
                    {bookingData.eventDateType === "multiple"
                      ? "Multiple Days"
                      : bookingData.eventDateType === "half"
                      ? "Half Day"
                      : "Full Day"}
                  </p>
                </div>
              </div>

              {bookingData.eventDateType === "half" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      for="grid-start-time"
                    >
                      Start Time
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time"
                    >
                      {format(
                        parseISO(bookingData.startTime.slice(0, -1)),
                        "hh:mm aa"
                      )}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-end-time"
                    >
                      End Time
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time"
                    >
                      {format(
                        parseISO(bookingData.endTime.slice(0, -1)),
                        "hh:mm aa"
                      )}
                    </p>
                  </div>
                </div>
              )}

              {bookingData.eventDateType === "multiple" && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      for="grid-start-time"
                    >
                      Event Start Date
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time"
                    >
                      {format(
                        new Date(bookingData.eventStartDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-end-time"
                    >
                      Event End Date
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time"
                    >
                      {format(
                        new Date(bookingData.eventEndDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap -mx-3 mb-6">
                {(bookingData.eventDateType === "full" ||
                  bookingData.eventDateType === "half") && (
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      for="grid-department"
                    >
                      Event Date
                    </h1>
                    <p
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-department"
                    >
                      {format(
                        new Date(bookingData.eventDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                )}

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-hall-name"
                  >
                    Hall Name
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-hall-name"
                  >
                    {bookingData.bookedHallName}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number"
                  >
                    Phone Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {bookingData.phoneNumber}
                  </p>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number"
                  >
                    Alternate Number
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                  >
                    {bookingData.altNumber}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number"
                  >
                    Institution
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {bookingData.institution} - {institutionName}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number"
                  >
                    Department
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                  >
                    {bookingData.department} - {departmentName}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-phone-number"
                  >
                    Requested By
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                  >
                    {bookingData.userId.name}
                  </p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <h1
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                    for="grid-alt-number"
                  >
                    Request Created At
                  </h1>
                  <p
                    className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number"
                  >
                    {format(
                      parseISO(bookingData.createdAt),
                      "EEEE dd-MM-yyyy hh:mm aa"
                    )}
                  </p>
                </div>
              </div>

              {bookingData.rejectionReason !== null && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <h1
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
                      for="grid-phone-number"
                    >
                      Reason For Rejection
                    </h1>
                    <p className="text-s text-red-600	 font-bold">
                      {bookingData.rejectionReason}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 ">
                {bookingData.isApproved === "Approved By Admin" && (
                  <ApprovedByAdmin />
                )}
                {bookingData.isApproved === "Approved By HOD" && (
                  <ApprovedByHod />
                )}
                {bookingData.isApproved === "Rejected By HOD" && (
                  <RejectedByHod />
                )}
                {bookingData.isApproved === "Rejected By Admin" && (
                  <RejectedByAdmin />
                )}
                {bookingData.isApproved === "Request Sent" && <RequestSent />}
              </div>


              <div className="px-5 py-5 text-l flex font-bold  bg-white justify-between border-gray-200">
                {state.userType === "admin" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Approved By Admin")
                      }
                      className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openModal(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none"
                    >
                      Reject
                    </button>
                  </>
                )}

                
                {state.userType === "hod" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="   leading-none text-gray-600 py-3 px-5 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Approved By HOD")
                      }
                      className="   leading-none text-gray-600 py-3 px-5 bg-green-200 rounded hover:bg-green-300 focus:outline-none"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Rejected By HOD")
                      }
                      className="   leading-none text-gray-600 py-3 px-5 bg-red-200 rounded hover:bg-red-300 focus:outline-none"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
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
                  updateBooking(bookingData._id, "Rejected By Admin")
                }
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookingsView;
