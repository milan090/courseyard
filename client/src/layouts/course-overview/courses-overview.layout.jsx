import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CourseContext } from "../../providers/course/course.provider";
import { UserContext } from "../../providers/user/user.provider";
import CoursePreview from "../../components/course-preview/course-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import "./courses.overview.styles.scss";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT_PRODUCTION;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
}

const CourseOverview = () => {
  const {
    courses,
    searchQuery,
    searchResults,
    setCourses,
    setIsLoading,
    isLoading,
  } = useContext(CourseContext);
  const { user } = useContext(UserContext);
  const [titleMessage, setTitleMessage] = useState("Top 30 Picks From Us!");
  const messageEditor = (msg) => {
    if (msg === "Top 30 Picks From Us!") {
      return (
        <span className="text-3xl lg:text-5xl md:text-4xl">
          Top <span className="top-course-no text-accent">30</span> Picks From Us!
        </span>
      );
    }
    return msg;
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/courses")
      .then((res) => {
        setIsLoading(false);
        setCourses(res.data.courses);
      })
      .catch((err) => {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [user]);

  useEffect(() => {
    if (searchQuery.length !== 0) {
      setTitleMessage(`Search results for ${searchQuery} (${searchResults.length} found)`);
    } else {
      setTitleMessage("Top 30 Picks From Us!");
    }
  }, [searchResults]);

  return (
    <div className="bg-accent course-overview">
      <Spinner isLoading={isLoading} height="h-20" width="w-20" className="h-64">
        <h1
          id="course-title-msg"
          className={`${
            titleMessage === "Top 30 Picks From Us" ? "text-5xl" : "text-3xl"
          } pt-16 pb-10 font-display font-bold text-center text-secondary`}
        >
          {messageEditor(titleMessage)}
        </h1>
        <div>
          <CoursePreview courses={searchResults === undefined ? courses : searchResults} />
        </div>
      </Spinner>
    </div>
  );
};

export default CourseOverview;
