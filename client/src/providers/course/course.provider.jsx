import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CourseContext = createContext({
  courses: [],
  setCourses: () => {},
  searchResults: undefined,
  setSearchResults: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        searchResults,
        setSearchResults,
        searchQuery,
        setSearchQuery,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CourseProvider;
