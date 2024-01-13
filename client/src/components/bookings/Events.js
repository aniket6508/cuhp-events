import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import EventCard from "./EventCard";

const Events = () => {
  // State to store event data
  const [eventData, setEventData] = useState({});
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch event data from the server
  const getEventData = async () => {
    try {
      // Make a GET request to the events endpoint
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/events`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Extract bookings data from the response
      const data = response.data.bookings;

      // Sort the event data based on the event date
      const sortedEventData = data.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      // Set the sorted event data and update loading state
      setEventData(sortedEventData);
      setIsLoading(false);

      // Check if the response status is not 200 and throw an error if not
      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch event data when the component mounts
  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <div className="mt-6 min-h-screen">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Upcoming<span className="text-indigo-700"> Events</span>{" "}
        </h1>
        {isLoading ? (
          // Display loading spinner while data is being fetched
          <LoadingSpinner />
        ) : Array.isArray(eventData) && eventData.length ? (
          // Display event cards if there are events
          eventData.map((eventsData) => (
            <EventCard key={eventsData._id} eventsData={eventsData} />
          ))
        ) : (
          // Display message if there are no upcoming events
          <h2 className="text-2xl font-bold text-zinc-700 text-center mt-10">
            No Upcoming Events.
          </h2>
        )}
      </div>
    </>
  );
};

export default Events;
