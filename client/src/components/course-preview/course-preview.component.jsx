import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.component";

const CoursePreview = ({ courses }) => (
  <div className="grid justify-items-center align-middle grid-flow-row xl:grid-cols-3 md:grid-cols-2 gird-cols-1">
    {courses.map(({ course_id, ...otherProps }) => (
      <Card key={course_id} course_id={course_id} {...otherProps} />
    ))}
  </div>
);

CoursePreview.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CoursePreview;
