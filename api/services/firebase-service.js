const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://courseyard-5278b.firebaseio.com",
});

module.exports = admin;
