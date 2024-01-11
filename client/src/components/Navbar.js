import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { RenderMenu, RenderUser } from "./Navbar/NavbarComponents";

const Navbar = () => {
  //To toogle responsive menu
  const toggleMenu = () => {
    document.getElementById("menu").classList.toggle("hidden");
  };

  //Main Navbar
  return (
    <>
      <nav className="w-full border-b">
        <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
          <Link to={"/"}>
            <div
              aria-label="Home. logo"
              className="flex justify-between items-center"
              role="img"
            >
              {/* This is the logo of website */}
              <img className=" w-24 md:w-48" src={logo} alt="logo" />
            </div>
          </Link>
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
            CUHP <span className="text-indigo-700">Events</span>{" "}
          </h1>
          <div>
            {/* //This is the toggle button used for responsiveness */}
            <button
              onClick={toggleMenu}
              className="sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <svg
                aria-haspopup="true"
                aria-label="open Main Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden icon icon-tabler icon-tabler-menu"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <line x1="4" y1="8" x2="20" y2="8"></line>
                <line x1="4" y1="16" x2="20" y2="16"></line>
                <line x1="4" y1="24" x2="20" y2="24"></line>
              </svg>
            </button>
            <div id="menu" className="md:block lg:block hidden">
              <button
                onClick={toggleMenu}
                className="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6"
              >
                <svg
                  aria-label="close main menu"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <ul
                onClick={toggleMenu}
                className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20"
              >
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0">
                  <Link to="/">Home</Link>
                </li>

                <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                  <Link to="/events">Events</Link>
                </li>

                <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                  <Link to="/calendar">Calendar</Link>
                </li>

                <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                  {/* This column is user specific which we are checking above */}
                  <RenderUser />
                </li>

                <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* //Here we are showing login status */}
          <RenderMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
