/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import "./card.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShareAlt, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../providers/user/user.provider";
import { CourseContext } from "../../providers/course/course.provider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase.service";

function Card({
  course_id,
  title,
  instructor,
  courseurl,
  imageurl,
  tags,
  description,
  favourite_id,
}) {
  const [liked, setLiked] = useState(false);
  const [toolboxdisplay, setToolBoxDisplay] = useState("hidden");

  const { setSearchQuery } = useContext(CourseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (favourite_id) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [favourite_id]);

  const likeHandler = () => {
    if (auth.currentUser && user.uid) {
      setLiked(!liked);
      const tmpLiked = !liked;
      (async () => {
        if (tmpLiked) {
          axios
            .put("/favourites/add", {
              course_id,
            })
            .then(() => {})
            .catch((err) => {
              console.error(err);
              setLiked(false);
            });
        } else {
          axios
            .post("/favourites/remove", {
              course_id,
            })
            .then((res) => {})
            .catch((err) => {
              console.error(err);
              setLiked(true);
            });
        }
      })();
    } else {
      history.push("/signin");
      window.scroll({ top: 0 });
    }
  };

  const copy = (value) => {
    let tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const ToolTip = ({ show }) => {
    return (
      <div
        className={`relative w-10 h-5 mx-2 ${show} ml-30 mb-2 z-10`}
        style={{ transform: "translateX(120px)" }}
      >
        <div className="bg-black text-white text-xs font-display rounded h-5 w-20 right-0 break-words text-center ml-30">
          Url Copied!
          <svg
            className="absolute text-black h-3 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="border-gray-300 border-t-0 card-box max-w-sm m-3 my-4 relative rounded-md overflow-hidden shadow-base hover:shadow-xl bg-secondary">
      <img
        className="course-cover w-full"
        src={
          imageurl
            ? imageurl
            : "https://www.ironagegrates.com/wp-content/uploads/2014/08/1280x720.png"
        }
        alt="course-cover"
      />
      <div className="tags flex flex-wrap justify-left ml-5 mb-3 mt-3 text-primary">
        {tags.map((tag, i) => {
          return (
            <div
              className="font-display hover:text-white text-xs flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full bg-opacity-0 text-primary border border-green-500 hover:bg-green-500 cursor-pointer"
              key={i}
              onClick={() => {
                setSearchQuery(tag.toLowerCase());
                window.scroll({
                  top: 80,
                  behavior: "smooth",
                });
              }}
            >
              {tag.toLowerCase()}
            </div>
          );
        })}
      </div>
      <div className="px-6 py-2 -mt-3 mb-3">
        <div className="break-words font-bold text-2xl mb-2 text-primary">
          {title || "I don't know Lorem Ipsum and you know that"}
        </div>
        <div className="text-primary font-medium mb-2 font-display">
          by <span className="font-semibold">{instructor || "anonymous"}</span>
        </div>
        <p className="text-primary text-base  font-display font-thin">{description}</p>
      </div>
      <div className="spacer h-16 inline-block"></div>
      <div className="w-full buttons m-5 absolute bottom-0 mt-13">
        <ToolTip show={toolboxdisplay} />
        <a href={courseurl} target="_blank" rel="noopener noreferrer">
          <button className="bg-transparent text-sm lg:text-base md:text-base font-display mr-2 focus:outline-none hover:bg-green-500 text-primary font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md">
            Learn More
          </button>
        </a>
        <button
          className="bg-transparent text-sm lg:text-base md:text-base font-display focus:outline-none hover:bg-green-500 text-primary font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-md"
          onClick={() => {
            copy(courseurl);
          }}
          onFocus={() => {
            setToolBoxDisplay("block");
            setTimeout(() => {
              setToolBoxDisplay("hidden");
            }, 1300);
          }}
        >
          Share
          <span className="mr-2"></span>
          <FontAwesomeIcon icon={faShareAlt} />
        </button>
        <button
          onClick={likeHandler}
          className={`star mb-2 mr-12 w-8 h-8 float-right focus:outline-none rounded-full text-2xl md:text-3xl lg:text-3xl ${
            liked ? "text-green-500 notliked" : "text-gray-500 hover:text-secondary liked"
          }`}
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </div>
  );
}

export default Card;
