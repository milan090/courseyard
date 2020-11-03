const express = require("express");
const router = express.Router();
const { db } = require("../../../server");

const { checkIfAuthenticated, getAuthToken } = require("../../services/auth-middleware");
const logger = require("../../utils/logger");

router.use(getAuthToken);

router.get("/getall", checkIfAuthenticated, async (req, res) => {
  if (!req.authId) return res.status(503).json({ message: "Not allowed" });
  try {
    const results = await db("favourite")
      .select([
        "course.course_id",
        "title",
        "description",
        "courseurl",
        "imageurl",
        "instructor",
        "tags",
        "favourite_id",
      ])
      .innerJoin("course", "course.course_id", "favourite.course_id")
      .where("user_account_uid", req.authId);
    if (!results) return res.json({ favourites: [] });
    return res.json({ favourites: results });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/add", checkIfAuthenticated, (req, res) => {
  const { course_id } = req.body;
  const { authId } = req;
  if (!course_id || !authId) return res.status(400).json({ message: "Oops something wrong" });
  db.raw(
    `? ON CONFLICT (user_account_uid, course_id)
        DO UPDATE SET
        course_id = EXCLUDED.course_id
        RETURNING *;`,
    [
      db("favourite").insert({
        course_id,
        user_account_uid: authId,
      }),
    ]
  )
    .then(() => {
      return res.json({ message: "Success" });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    });
});

router.post("/remove", checkIfAuthenticated, (req, res) => {
  const { course_id } = req.body;
  const { authId } = req;
  if (!course_id || !authId) return res.status(400).json({ message: "Something went wrong" });

  db("favourite")
    .where({
      user_account_uid: authId,
      course_id: course_id,
    })
    .del()
    .then(() => {
      logger.log("Removed favourite");
      return res.json({ message: "Success" });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    });
});

module.exports = router;
