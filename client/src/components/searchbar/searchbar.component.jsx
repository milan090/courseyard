import React, { useContext, useEffect, useState } from "react";
import "./searchbar.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchCourses } from "./searchbar.utils";
import { CourseContext } from "../../providers/course/course.provider";

const search_suggestions = [
  "python course...",
  "java course...",
  "c++ course...",
  "machine learning...",
  "guitar course",
  "learn piano",
  "digital marketing",
];

const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSearchResults, setIsLoading } = useContext(
    CourseContext
  );
  const [searchAction, setSearchAction] = useState(undefined);
  const [searchSuggestion] = useState(
    search_suggestions[Math.floor(Math.random() * (search_suggestions.length - 1 + 1))]
  );

  useEffect(() => {
    clearTimeout(searchAction);
    if (searchQuery.length > 0) {
      setIsLoading(true);
      setSearchAction(
        setTimeout(async () => {
          try {
            setIsLoading(true);
            const data = await searchCourses(searchQuery);
            setIsLoading(false);
            setSearchResults(data);
          } catch (error) {
            setIsLoading(false);
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }, 400)
      );
    } else {
      setIsLoading(false);
      setSearchAction(setTimeout(() => setSearchResults(undefined), 1500));
    }
  }, [searchQuery]);

  return (
    <section className="h-16 lg:w-4/12 md:w-5/12 sm:w-6/12 w-10/12 bg-secondary">
      <div className="flex mx-auto mt-20">
        <input
          id="search-input"
          className="w-full h-12 rounded-l-full mb-8 text-xl px-8 shadow-lg focus:shadow-xl focus:outline-none searchbox"
          type="search"
          placeholder={searchSuggestion}
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
        />
        <button className="search-icon shadow-lg right-0 w-16 h-12 bg-primary text-secondary-accent pr-1 rounded-r-full focus:outline-none">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
