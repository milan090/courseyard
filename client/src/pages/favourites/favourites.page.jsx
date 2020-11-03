import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CoursePreview from "../../components/course-preview/course-preview.component";
import axios from "axios";
import { UserContext } from "../../providers/user/user.provider";
import "./favourites.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";

function FavouritesPage() {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    document.title = "Courseyard | Favourites";
    if (user.uid) {
      axios
        .get("/favourites/getall")
        .then((res) => {
          setCourses(res.data.favourites);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      history.push("/signin");
    }
  }, [user]);

  const NoCourses = () => {
    return (
      <div className="mr-auto ml-auto text-center p-5 w-full lg:w-1/2 md:w-1/2 pb-16">
        <h1 className="text-primary font-display text-3xl font-semibold">
          {" "}
          <FontAwesomeIcon icon={faBookmark} /> Seems like you have no Favourite Courses.
        </h1>
        <h2 className="text-secondary font-display text-lg mt-3">
          Click the <FontAwesomeIcon icon={faStar} /> icon below the courses to set one as your
          favourite.
        </h2>
      </div>
    );
  };

  return (
    <div className="bg-accent">
      <h1 className="title-fav mb-10 text-center text-5xl lg:text-6xl md:text-5xl font-bold font-display text-primary">
        Favourites
      </h1>
      {courses.length !== 0 ? <CoursePreview courses={courses} /> : <NoCourses />}
    </div>
  );
}

export default FavouritesPage;
