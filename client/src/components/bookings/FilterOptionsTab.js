import React, { useContext } from "react";
import { UserContext } from "../../App";

const FilterOptionsTab = ({handleFilter,filterValue}) => {
  const { state } = useContext(UserContext);
  return (
    <>
      {state.userType !== "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Request Sent"
              ? "bg-indigo-100 text-indigo-800 "
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Request Sent")}
        >
          Pending
        </button>
      )}
      {state.userType !== "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Approved By HOD"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Approved By HOD")}
        >
          Forwarded To Admin
        </button>
      )}
      {state.userType !== "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Rejected By HOD"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800   hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Rejected By HOD")}
        >
          Rejected By Hod
        </button>
      )}
      {state.userType !== "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Approved By Admin"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Approved By Admin")}
        >
          Approved By Admin
        </button>
      )}
      {state.userType !== "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Rejected By Admin"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800   hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Rejected By Admin")}
        >
          Rejected By Admin
        </button>
      )}
      {(process.env.REACT_APP_HOD_FEATURE === "true" &&
        state.userType === "admin") && (
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
              filterValue === "Approved By HOD"
                ? "bg-indigo-100 text-indigo-800 "
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={() => handleFilter("Approved By HOD")}
          >
            Pending
          </button>
        )}
      {state.userType === "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Approved By Admin"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Approved By Admin")}
        >
          Approved
        </button>
      )}
      {state.userType === "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "Rejected By Admin"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800   hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("Rejected By Admin")}
        >
          Rejected
        </button>
      )}
      {state.userType === "admin" && (
        <button
          className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${
            filterValue === "My Requests"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-white text-gray-800   hover:bg-gray-100"
          }`}
          onClick={() => handleFilter("My Requests")}
        >
          My Requests
        </button>
      )}
    </>
  );
};

export default FilterOptionsTab;
