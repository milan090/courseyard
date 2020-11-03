/* eslint-disable no-console */
require("dotenv").config("..");

const db = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "test1234",
    database: process.env.DB_NAME || "courseyard",
  },
});

const data = require(process.argv[2]);

function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// Verify data
let flag = 0;

data.forEach((course, i) => {
  if (typeof course.title !== "string") {
    console.error(`[${i}]: title`);
    flag++;
  }
  if (typeof course.description !== "string") {
    console.error(`[${i}]: description`);
    flag++;
  } else {
    data[i].description = course.description.slice(0, 250);
  }
  if (typeof course.instructor !== "string") {
    console.error(`[${i}]: instructor`);
    flag++;
  }
  if (!validURL(course.courseurl)) {
    console.error(`[${i}]: Course URL ${course.title}`);
    flag++;
  }
  if (!validURL(course.imageurl)) {
    console.error(`[${i}] Image URL ${course.title}`);
    flag++;
  }
  if (!course.tags[0]) {
    console.error(`[${i}]: tags`);
    flag++;
  } else {
    console.log(course.tags);
  }
});

if (flag === 0) {
  console.log("Inserting data");
  db("course")
    .insert(data)
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
    .finally(() => db.destroy());
}
