import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase/firebase.service";
import { useHistory } from "react-router-dom";

export const UserContext = createContext({
  user: {},
  setUser: () => {},
  signOutUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        setUser({});
        history.push("/signin");
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error("Signout: something went wrong");
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser, signOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
