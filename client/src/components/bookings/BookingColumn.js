import React from "react";

const BookingColumn = () => {
  return (
    <tr className="bg-gray-200 border-gray-500  leading-normal  text-center">
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
      >
        Event Name
      </th>
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase  border-gray-200"
      >
        Hall Name
      </th>
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
      >
        Organizing Club
      </th>
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
      >
        Department
      </th>
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
      >
        Event Date
      </th>
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
      >
        Status
      </th>
      <th
        scope="col"
        className="px-4 py-3 text-l   text-gray-800 uppercase   border-gray-200"
      >
        Actions
      </th>
    </tr>
  );
};

export default BookingColumn;
