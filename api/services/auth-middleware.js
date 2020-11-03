const admin = require("./firebase-service");

const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

exports.checkIfAuthenticated = async (req, res, next) => {
  try {
    const { authToken } = req;
    const userInfo = await admin.auth().verifyIdToken(authToken);
    const user = { email: userInfo.email };
    req.user = user;
    req.authId = userInfo.uid;
    await next();
  } catch (err) {
    console.error("EROR", err);
    return res.status(401).send({ error: "You are not authorized to make this request" });
  }
};

exports.getAuthToken = getAuthToken;
