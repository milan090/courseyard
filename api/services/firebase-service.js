const admin = require("firebase-admin");

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.applicationDefault(serviceAccount),
  databaseURL: "https://courseyard-5278b.firebaseio.com",
});

module.exports = admin;
