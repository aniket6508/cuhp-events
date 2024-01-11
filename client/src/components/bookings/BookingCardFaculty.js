import React from "react";
import { format } from "date-fns";

const BookingCardFaculty = ({booking,handleViewClick,filterValue}) => {
  return (
    <tr key={booking._id} className="border-gray-200 text-center border-b-2  ">
      <td className="px-5 py-5 font-bold text-m  bg-white  border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{booking.eventName}</p>
      </td>
      <td className="px-5 py-5 text-m bg-white  border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {booking.bookedHallName}
        </p>
      </td>
      <td className="px-5 py-5 text-m bg-white  border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          {booking.organizingClub}
        </p>
      </td>
      <td className="px-5 py-5 text-m bg-white  border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{booking.department}</p>
      </td>
      <td className="px-5 py-5 text-m bg-white  border-gray-200">
        {booking.eventDateType === "multiple" ? (
          <p className="text-gray-900 whitespace-no-wrap ">
            {format(new Date(booking.eventStartDate), "EEEE dd-MM-yyyy")}
            <br />
            To
            <br />
            {format(new Date(booking.eventEndDate), "EEEE dd-MM-yyyy")}
          </p>
        ) : (
          <p className="text-gray-900 whitespace-no-wrap">
            {format(new Date(booking.eventDate), "EEEE dd-MM-yyyy")}
          </p>
        )}
      </td>

      <td className="px-5 py-5 text-m bg-white  border-gray-200">
        {booking.isApproved === "Approved By Admin" && (
          <p className="text-green-600 font-bold whitespace-no-wrap">
            {booking.isApproved}
          </p>
        )}
        {booking.isApproved === "Approved By HOD" && (
          <p className="text-blue-600 font-bold  whitespace-no-wrap">
            Forwarded To Admin
          </p>
        )}

        {booking.isApproved === "Rejected By HOD" && (
          <p className="text-red-900 font-bold  whitespace-no-wrap">
            {booking.isApproved}
          </p>
        )}

        {booking.isApproved === "Rejected By Admin" && (
          <p className="text-red-900 font-bold  whitespace-no-wrap">
            {booking.isApproved}
          </p>
        )}
        {booking.isApproved === "Request Sent" && (
          <p className="text-orange-600 font-bold  whitespace-no-wrap">
            Pending
          </p>
        )}
      </td>

      <td className="px-5 py-5 text-m bg-white  border-gray-200">
        <button
          onClick={() => handleViewClick(booking._id)}
          className="text-m font-bold ml-5 leading-none text-gray-600 py-3 px-5 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default BookingCardFaculty;
