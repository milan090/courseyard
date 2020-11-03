<p align="center"><img src="./assets/courseyard-banner-light.png" height="80"></p>

## 💡 Introduction

A handpicked collection of best free online learning resources on the Planet 🌎.

![javascript](https://img.shields.io/badge/-javascript-yellow) ![react](https://img.shields.io/badge/-react-red) ![express](https://img.shields.io/badge/-express-green) ![postgresql](https://img.shields.io/badge/-postgresql-blue)

## 🤩 Quirks

- Get the best **free**, **handpicked** learning resources available on the internet.
- Get a bunch of cool courses available on different **languages**.
- Courses are provided with **tags** for easy manipulation of users.
- Easy and cool **description** provided for each course.
- Get to choose some of your **favourite** courses among all, and be your own mentor.
- Suggest us with some the **picks of your** to extend our library.

---

### Setting Up the Database

1. Install postgresql
2. Create a database courseyard:
   `CREATE DATABASE courseyard;`

3. Create the table for storing courses. Create a database named `courseyard`. Then run the copy-paste the code in db.sql into psql and hit enter. This will setup your database.

4. Setup .env file in root directory and add in the following details :

   ```dotenv
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=courseyard
   ```

5. (Optional) Setup test data for courses.
   `node utils/addDataToDB $(pwd)/testData.json`
   This will setup some test data (55 courses) for testing this project
   
---

### Team Coffee!☕

We are a team of 3!

- [Karan](https://github.com/KaranSinghBisht) 😎
- [Saptarshi](https://github.com/saptarshibasu15) 😴
- [Milan](https://github.com/milan090) 🤠

##### Crafted With ♥ By Team Coffee

![love-badge](https://forthebadge.com/images/badges/built-with-love.svg)
