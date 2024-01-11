import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "./EventCard";

const Events = () => {
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEventData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/events`,
        {
          // withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.bookings;
      //consolelog(data);

      const sortedEventData = data.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setEventData(sortedEventData);

      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <div className="mt-6 min-h-screen">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Upcomming<span className="text-indigo-700"> Events</span>{" "}
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : Array.isArray(eventData) && eventData.length ? (
          eventData.map((eventsData) => (
            <EventCard eventsData={eventsData} />
          ))
        ) : (
          <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">
            No Upcomming Events.
          </h2>
        )}
      </div>
    </>
  );
};

export default Events;
