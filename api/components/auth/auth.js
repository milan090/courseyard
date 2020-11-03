const express = require("express");
const router = express.Router();
// const { db } = require("../../server");

const { createUser } = require("./auth-controller");
const { getAuthToken } = require("../../services/auth-middleware");

router.use(getAuthToken);

router.post("/signup", createUser);

module.exports = router;
