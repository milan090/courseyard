import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import HomePage from "./pages/home/home.page";
import SigninPage from "./pages/signin/signin.page";
import SignupPage from "./pages/signup/signup.page";
import FavouritesPage from "./pages/favourites/favourites.page";
import NotFoundPage from "./pages/not-found/not-found.page";
import About from "./pages/about/about.page";
import SuggestACoursePage from "./pages/suggest-a-course/suggest-a-course.component";

import Footer from "./components/footer/footer.component";

import axios from "axios";
import { UserContext } from "./providers/user/user.provider";
import { auth } from "./firebase/firebase.service";

import "./tailwind.output.css";
import "./App.css";

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    return auth.onAuthStateChanged(async (userRef) => {
      if (userRef) {
        const token = await auth.currentUser.getIdToken();
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

        const user = {
          uid: userRef.uid,
          email: userRef.email,
          photoURL: userRef.photoURL,
        };
        setUser(user);
      } else {
        axios.defaults.headers.common["authorization"] = null;
      }
    });
  }, []);

  return (
    <div className="App theme-dark bg-secondary min-h-screen">
      <Navbar />
      <div id="main__body">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/favourites" component={FavouritesPage} />
          <Route exact path="/suggest-a-course" component={SuggestACoursePage} />
          <Route exact path="/about" component={About} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <div className="bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default App;
