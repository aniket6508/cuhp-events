import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// importing components
import axios from "axios";

import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import { CalendarView } from "./components/CalendarView";

import Events from "./components/bookings/Events";

import About from "./components/About";
import Contact from "./components/Contact";

import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";

import BookingForm from "./components/bookings/BookingForm";
import BookingsAdmin from "./components/bookings/BookingsAdmin";
import BookingsHod from "./components/bookings/BookingsHod";
import BookingFaculty from "./components/bookings/BookingsFaculty";
import BookingsView from "./components/bookings/BookingView";
import BookingUpdateFrom from "./components/bookings/BookingUpdateForm";

import AdminDashboard from "./components/dashboard/AdminDashboard";
import FacultyDashboard from "./components/dashboard/FacultyDashboard";
import HodDashboard from "./components/dashboard/HodDashboard";

import Halls from "./components/halls/Halls";
import HallsAdmin from "./components/halls/HallsAdmin";
import HallsEdit from "./components/halls/HallsEdit";
import HallForm from "./components/halls/HallForm";

import PasswordReset from "./components/auth/PasswordReset";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifySuccess from "./components/auth/VerifySuccess";
import Unauthorized from "./components/Unauthorized";
export const UserContext = createContext();
const App = () => {
  const token = localStorage.getItem("jwtoken");
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  axios.defaults.withCredentials = true;

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
        {/* Here we are checking which user is logged in and showing corresponding dashboard */}
          <Route
            path="/"
            element={
              state.userType === "admin" ? (
                <AdminDashboard />
              ) : state.userType === "faculty" ? (
                <FacultyDashboard />
              ) : process.env.REACT_APP_HOD_FEATURE &&
                state.userType === "hod" ? (
                <HodDashboard />
              ) : (
                <Login />
              )
            }
          />
          {/* <Route path="/passwordReset" element={<PasswordReset />} /> */}
          <Route path="/profile" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route
            path="/forgotPassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="/verifyEmail/:id/:token" element={<VerifySuccess />} />
          <Route path="/events" element={<Events />} />

          <Route
            path="/halls"
            element={state.userType === "admin" ? <HallsAdmin /> : <Halls />}
          />
          <Route
            exact
            path="/halls/:hallId/:hallName"
            element={
              state.userType === "admin" ? <HallsEdit /> : <Unauthorized />
            }
          />
          <Route
            exact
            path="/bookingsEdit/:bookingId"
            element={
              state.userType === "admin" ? (
                <BookingUpdateFrom />
              ) : process.env.REACT_APP_HOD_FEATURE &&
                state.userType === "hod" ? (
                <BookingUpdateFrom />
              ) : (
                <Unauthorized />
              )
            }
          />

          <Route
            path="/hallForm"
            element={
              state.userType === "admin" ? <HallForm /> : <Unauthorized />
            }
          />

          <Route
            path="/bookings"
            element={
              state.userType === "admin" ? (
                <BookingsAdmin />
              ) : state.userType === "faculty" ? (
                <BookingFaculty />
              ) : process.env.REACT_APP_HOD_FEATURE &&
                state.userType === "hod" ? (
                <BookingsHod />
              ) : (
                <Unauthorized />
              )
            }
          />
          <Route
            exact
            path="/bookingForm/:hallId/:hallName"
            element={<BookingForm />}
          />
          {/* <Route path="/bookings" element={<Booking/>} /> */}

          <Route
            exact
            path="/bookingsView/:bookingId"
            element={<BookingsView />}
          />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </UserContext.Provider>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
