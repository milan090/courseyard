const express = require("express");
const router = express.Router();
const { db } = require("../../../server");
const admin = require("../../services/firebase-service");
const { getAuthToken, checkIfAuthenticated } = require("../../services/auth-middleware");
const logger = require("../../utils/logger");

const course_data = [
  "course.course_id",
  "title",
  "description",
  "courseurl",
  "imageurl",
  "instructor",
  "tags",
  "favourite_id",
];

router.use(getAuthToken);
router.use(async (req, res, next) => {
  const { authToken } = req;
  if (authToken) {
    try {
      const userInfo = await admin.auth().verifyIdToken(authToken);
      if (userInfo) {
        const user = { email: userInfo.email };
        req.user = user;
        req.authId = userInfo.uid;
      }
    } catch (err) {
      logger.error(err);
      return res.status(401).send({ error: "You are not authorized to make this request" });
    }
  }
  next();
});

router.get("/", async (req, res) => {
  const offset = Number(req.query.offset) || 0;
  db("course")
    .select(course_data)
    .orderByRaw("RANDOM()")
    .leftOuterJoin("favourite", function () {
      this.on("course.course_id", "=", "favourite.course_id").andOn(
        "favourite.user_account_uid",
        "=",
        db.raw("?", [req.authId || ""])
      );
    })
    .limit(30)
    .offset(offset)
    .then((data) => {
      if (!data[0]) return res.status(404).json({ data: [] });
      return res.json({ courses: data });
    })
    .catch((error) => {
      logger.error(error);
      return res
        .status(500)
        .json({ error: "Something went wrong. We couldn't fetch the data" });
    });
});

router.get("/search", (req, res) => {
  let { q } = req.query;
  if (!q) return res.status(404).json({ error: "No search query provided" });

  q = q.trim();

  db("course")
    .select(course_data)
    .whereRaw("? ILIKE any (??)", [q, "tags"])
    .orWhereRaw(`body_tsv @@ to_tsquery('${q.split(" ").join(" & ")}')`)
    .leftOuterJoin("favourite", function () {
      this.on("course.course_id", "=", "favourite.course_id").andOn(
        "favourite.user_account_uid",
        "=",
        db.raw("?", [req.authId || ""])
      );
    })
    .then((data) => {
      if (!data[0]) return res.status(404).json({ data: [] });
      return res.json({ courses: data });
    })
    .catch((error) => {
      logger.error(error);
      return res.json({ error: "Something went wrong" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db("course")
    .select(course_data)
    .where("id", id)
    .then((data) => {
      if (!data[0]) return res.status(404).json({ data: [] });
      return res.json({ data: data[0] });
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).json({ error: "Something went wrong on our side" });
    });
});

router.post("/suggest", checkIfAuthenticated, (req, res) => {
  const { name, email, title, url, description, tags } = req.body;
  if (!name || !email || !title || !url || !description || !tags[0]) {
    return res.status(422).json({ error: "Not enough data provided to process this request" });
  }

  db("suggested_course")
    .insert({
      name,
      email,
      title,
      url,
      description,
      tags,
    })
    .then(() => {
      res.json({ message: "Success" });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ error: "Something went wrong on our side" });
    });
});

module.exports = router;
