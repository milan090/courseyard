import { auth, googleProvider } from "./firebase.service";
import axios from "axios";

export const createUserWithEmailPassword = (email, password) => {
  return axios
    .post("/auth/signup", { email, password })
    .then(() => {
      loginUserEmailPassword(email, password);
    })
    .catch((err) => {
      if (err.response.data.exists) {
        console.info(err.response.data);
        throw err.response.data;
      }
    });
};

export const loginUserEmailPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = async () => {
  const result = await auth.signInWithPopup(googleProvider);
  // const result = await auth.getRedirectResult();
  console.log(result);
  if (!result.additionalUserInfo) return;
  if (result.additionalUserInfo.isNewUser) return createUserInDB(result.user);
};

export const createUserInDB = async (user) => {
  if (user) {
    const { uid, email } = user;
    const token = await user.getIdToken();
    try {
      const response = await axios.post(
        "/auth/signup",
        {
          uid,
          email,
          mode: "GOOGLE",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.exists) {
        console.log("User exists");
      } else {
        console.log("User signed up successfully");
      }
    } catch (error) {
      console.log("ACCOUNT EXISTS");
      console.error(error.response);
    }
  }
};
