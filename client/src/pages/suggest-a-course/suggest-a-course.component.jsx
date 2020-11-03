import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Spinner from "../../components/spinner/spinner.component";

import "./suggest-a-course.styles.scss";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../providers/user/user.provider";
import axios from "axios";

function SuggestACoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagsText, setTagsText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const { user } = useContext(UserContext);
  let tag_query;

  useEffect(() => {
    document.title = "Courseyard | Suggest a Course";
    if (!user.uid) {
      history.push("/signin");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!name || !email || !title || !url || !description || !tags.length) {
      setIsSubmitting(false);
      return alert("Please fill all the fields");
    }
    axios
      .post("/courses/suggest", {
        name,
        email,
        title,
        url,
        description,
        tags,
      })
      .then(() => {
        setIsSubmitting(false);
        history.push("/");
        alert("Submitted succesfully");
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error(err);
        alert("Something went wrong");
      });
  };

  const tagHandler = (e) => {
    tag_query = e.target.value;
    for (let i = 0; i < e.target.value.length; i++) tag_query = tag_query.replace(" ", "");
    setTagsText(tag_query);
    setTags(tag_query.split(","));
    tag_query = "";
  };

  return (
    <div className="bg-accent">
      <h1 className="title-add-courses mb-5 pt-2 text-center text-3xl lg:text-6xl md:text-5xl font-bold font-display text-primary">
        Suggest A Course!
      </h1>
      <div className="text-primary flex flex-col p-5 md:w-8/12 sm:w-7/12 lg:w-2/5 mx-auto">
        <p className="text-center text-primary mx-2 font-display mb-10">
          Your submissions will be reviewed by our team and will only be uploaded once it has
          passed the verification.
        </p>
        <form className="flex flex-col">
          <div className="grid md:grid-cols-2 md:gap-10">
            <CustomInput
              type="text"
              name="Your Name"
              value={name}
              onChangeHandler={(e) => {
                setName(e.target.value);
              }}
            />
            <CustomInput
              type="email"
              name="Email"
              value={email}
              onChangeHandler={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <CustomInput
            type="text"
            name="Course Title"
            value={title}
            onChangeHandler={(e) => {
              setTitle(e.target.value);
            }}
          />
          <CustomInput
            type="url"
            name="Course Url"
            value={url}
            onChangeHandler={(e) => {
              setUrl(e.target.value);
            }}
          />
          <CustomInput
            type="text"
            name="Tags"
            className="tags-input-field"
            value={tagsText}
            onChangeHandler={tagHandler}
            placeholder="Seperate tags with commas (,)"
          />
          <label htmlFor="description" className="font-display opacity-50 ml-1 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="border-2 focus:outline-none bg-transparent border-gray-500 p-2 focus:border-primary rounded-md"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <CustomButton
            className="text-gray-900 w-1/2 rounded-xl mr-auto ml-auto mt-5 mb-2"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <Spinner height="h-10" width="w-10" isLoading={isSubmitting}>
              Submit
            </Spinner>
          </CustomButton>
        </form>
      </div>
    </div>
  );
}

export default SuggestACoursePage;
