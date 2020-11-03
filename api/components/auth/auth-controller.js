const admin = require("../../services/firebase-service");
const { db } = require("../../../server");
const logger = require("../../utils/logger");

exports.createUser = async (req, res) => {
  let { email, password, photoUrl, uid } = req.body;
  let mode = req.body.mode || "";
  try {
    // Check if user exists
    const user = await db("user_account").select("*").where("email", email).first();
    if (user) {
      logger.info(user);
      return res.status(400).json({ exists: true });
    }
  } catch (error) {
    return res.send(503).send("Error");
  }

  if (mode.length === 0) {
    // Register user on firebase
    logger.info("resgistering in db");
    try {
      const user = await admin.auth().createUser({
        email,
        password,
        photoURL: photoUrl,
      });
      uid = user.uid; // Getting uid from newUser
    } catch (error) {
      logger.error(error);
      return res.status(503).send("Error resgistering on database");
    }
  } else if (mode === "GOOGLE") {
    // Verify if signed in with google
    logger.info("GOOGLE REGISTER");
    const { authToken } = req;
    if (authToken) {
      try {
        await admin.auth().verifyIdToken(authToken);
      } catch (error) {
        logger.error(error);
        return res.status(503);
      }
    } else {
      return res.status(503);
    }
  }

  if (!uid) return res.status(500);
  db("user_account")
    .insert({
      email,
      user_account_uid: uid,
    })
    .returning("*")
    .then((newUser) => {
      logger.info("NEW USER REGISTERED ON DB");
      return res.send(newUser);
    })
    .catch((err) => {
      logger.error(err);
      return res.status(400);
    });
};
