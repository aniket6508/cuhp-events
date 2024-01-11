import React from "react";
import { format, parseISO } from "date-fns";
import { DepartmentList } from "../InstitutionDeptartmentList";

const EventCard = ({eventsData}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-10 ">
        <div className="relative flex flex-col items-center  mx-auto  rounded-xl p-8 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-10/12 bg-white">
          <div className="mt-8 mb-8 w-full">
            <h4 className="px-2 text-2xl font-bold text-navy-500 ">
              {eventsData.eventName}
            </h4>
          </div>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 px-2 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-m font-bold text-gray-600">Event Venue</p>
              <p className="text-base font-medium text-navy-700   ">
                {eventsData.bookedHallName}
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-m font-bold text-gray-600">Location</p>
              <p className="text-base font-medium text-navy-700 ">
                {eventsData.bookedHall.location}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="ext-m font-bold text-gray-600">Organizing Club</p>
              <p className="text-base font-medium text-navy-700 ">
                {eventsData.organizingClub}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="ext-m font-bold text-gray-600">Event Date Type</p>
              <p className="text-base font-medium text-navy-700 ">
                {eventsData.eventDateType === "multiple"
                  ? "Multiple Days"
                  : eventsData.eventDateType === "half"
                  ? "Half Day"
                  : "Full Day"}
              </p>
            </div>
            {(eventsData.eventDateType === "full" ||
              eventsData.eventDateType === "half") && (
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="ext-m font-bold text-gray-600">Event Date</p>
                <p className="text-base font-medium text-navy-700 ">
                  {format(new Date(eventsData.eventDate), "EEEE dd-MM-yyyy")}
                </p>
              </div>
            )}
            {eventsData.eventDateType === "half" && (
              <>
                <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p className="ext-m font-bold text-gray-600">Starts At</p>
                  <p className="text-base font-medium text-navy-700 ">
                    {format(parseISO(eventsData.startTime.slice(0, -1)), "hh:mm aa")}
                  </p>
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p className="ext-m font-bold text-gray-600">Ends At</p>
                  <p className="text-base font-medium text-navy-700 ">
                    {format(parseISO(eventsData.endTime.slice(0, -1)), "hh:mm aa")}
                  </p>
                </div>
              </>
            )}
            {eventsData.eventDateType === "multiple" && (
              <>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p className="ext-m font-bold text-gray-600">
                    Event Start Date
                  </p>
                  <p className="text-base font-medium text-navy-700 ">
                    {format(new Date(eventsData.eventStartDate), "EEEE dd-MM-yyyy")}
                  </p>
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p className="ext-m font-bold text-gray-600">
                    Event End Date
                  </p>
                  <p className="text-base font-medium text-navy-700 ">
                    {format(new Date(eventsData.eventEndDate), "EEEE dd-MM-yyyy")}
                  </p>
                </div>
              </>
            )}

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="ext-m font-bold text-gray-600">Event Coordinator</p>
              <p className="text-base font-medium text-navy-700 ">
                {eventsData.eventManager}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="ext-m font-bold text-gray-600">Department</p>
              <p className="text-base font-medium text-navy-700 ">
                {eventsData.department} - {DepartmentList[eventsData.department]}
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="ext-m font-bold text-gray-600">Phone</p>
              <p className="text-base font-medium text-navy-700 ">
                {eventsData.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
