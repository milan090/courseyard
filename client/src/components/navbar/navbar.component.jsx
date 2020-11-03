import React, { useEffect, useState, useContext } from "react";
import Switch from "../switch/switch.component";
import { Transition } from "@headlessui/react";
import { UserContext } from "../../providers/user/user.provider";
import CustomButton from "../custom-button/custom-button.component";
import { NavLink } from "react-router-dom";
import LogoLight from "../../assets/courseyard-logo-light.png";
import "./navbar.styles.scss";

export default function Navbar() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://cdn1.iconfinder.com/data/icons/app-user-interface-glyph/64/user_man_user_interface_app_person-512.png"
  );
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("THEME");
    setIsDarkTheme(theme !== "LIGHT");
    document.getElementById("main__body").addEventListener("click", () => {
      setProfileDropdown(false);
    });
  }, []);

  useEffect(() => {
    if (!user.photoURL) {
      setProfilePicUrl(
        "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg"
      );
    } else {
      setProfilePicUrl(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    document
      .querySelector(".App")
      .classList.remove(`theme-${!isDarkTheme ? "dark" : "light"}`);
    document.querySelector(".App").classList.add(`theme-${isDarkTheme ? "dark" : "light"}`);
    localStorage.setItem("THEME", isDarkTheme ? "DARK" : "LIGHT");
  }, [isDarkTheme]);

  return (
    <nav className="bg-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  className="inner lg:hidden h-8 w-auto"
                  src={LogoLight}
                  alt="Courseyard logo"
                />
              </a>
              <a href="/">
                <img
                  className="hidden lg:inline h-8 w-auto mb-2"
                  src={LogoLight}
                  alt="Courseyard logo"
                />
              </a>
              <span className="ml-3 text-secondary text-2xl font-semibold font-display hidden lg:inline">
                Courseyard
              </span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <NavLink
                  exact
                  to="/"
                  className="px-3 py-2 mx-3 rounded-md text-sm font-display font-medium leading-5 text-secondary hover:outline-none hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
                  activeClassName="bg-gray-900 active-link"
                >
                  Home
                </NavLink>
                {user.uid ? (
                  <NavLink
                    exact
                    to="/favourites"
                    className="px-3 py-2 mx-3 rounded-md text-sm font-display font-medium leading-5 text-secondary hover:outline-none hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
                    activeClassName="bg-gray-900 active-link"
                  >
                    Favourites
                  </NavLink>
                ) : null}
                <NavLink
                  exact
                  to="/suggest-a-course"
                  className="px-3 py-2 mx-3 rounded-md text-sm font-display font-medium leading-5 text-secondary hover:outline-none hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
                  activeClassName="bg-gray-900 active-link"
                >
                  Suggest A Course
                </NavLink>
                <NavLink
                  exact
                  to="/about"
                  className="px-3 py-2 mx-3 rounded-md text-sm font-display font-medium leading-5 text-secondary hover:outline-none hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
                  activeClassName="bg-gray-900 active-link"
                >
                  About
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Switch onChange={toggleTheme} checked={isDarkTheme} />

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                {user.uid ? (
                  <button
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                    onClick={() => setProfileDropdown(!profileDropdown)}
                  >
                    <img className="h-8 w-8 rounded-full" src={profilePicUrl} alt="" />
                  </button>
                ) : (
                  <NavLink to="/signin">
                    <CustomButton className="text-sm shadow-lg font-normal px-2 rounded">
                      Sign In
                    </CustomButton>
                  </NavLink>
                )}
              </div>
              <Transition
                show={profileDropdown}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leaving="transition ease-in duration-75"
                lavingfrom="transform opacity-100 scale-100"
                leavingto="transform opacity-0 scale-95"
              >
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                >
                  <div
                    className="py-1 rounded-md bg-white shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <NavLink
                      to="/signin"
                      onClick={signOutUser}
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                      role="menuitem"
                      style={{
                        pointerEvents: "all",
                      }}
                    >
                      Sign out
                    </NavLink>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      {/*
      Mobile menu, toggle classes based on menu state.

      Menu open: "block", Menu closed: "hidden"
    */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3">
          <NavLink
            exact
            to="/"
            className="block px-3 py-2 rounded-md text-base font-display font-medium text-secondary focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            activeClassName="bg-gray-900 active-link"
          >
            Home
          </NavLink>
          {user.uid ? (
            <NavLink
              exact
              to="/favourites"
              className="block px-3 py-2 rounded-md text-base font-display font-medium text-secondary focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              activeClassName="bg-gray-900 active-link"
            >
              Favourites
            </NavLink>
          ) : null}
          <NavLink
            exact
            to="/suggest-a-course"
            className="block px-3 py-2 rounded-md text-base font-display font-medium text-secondary focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            activeClassName="bg-gray-900 active-link"
          >
            Suggest A Course
          </NavLink>
          <NavLink
            exact
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-display font-medium text-secondary focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
            activeClassName="bg-gray-900 active-link"
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
