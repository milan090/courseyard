import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import CourseProvider from "./providers/course/course.provider";
import UserPropvider from "./providers/user/user.provider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserPropvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </UserPropvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
