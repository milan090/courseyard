DROP TABLE IF EXISTS favourite;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS course;

CREATE TABLE course (
  course_id BIGSERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description VARCHAR(250) NOT NULL,
  body_tsv TSVECTOR NOT NULL,
  instructor VARCHAR(150),
  courseurl VARCHAR(100) NOT NULL UNIQUE,
  imageurl VARCHAR(150) NOT NULL,
  tags text[] NOT NULL,
);


CREATE TRIGGER body_tsv_update BEFORE INSERT OR UPDATE
ON course FOR EACH ROW EXECUTE PROCEDURE
tsvector_update_trigger(body_tsv, 'pg_catalog.english', title, description);


CREATE TABLE user_account (
  user_account_uid VARCHAR(50) PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE favourite (
  favourite_id BIGSERIAL PRIMARY KEY,
  user_account_uid VARCHAR(50) NOT NULL,
  course_id BIGINT NOT NULL,
  UNIQUE(user_account_uid, course_id),
  CONSTRAINT fk_course
    FOREIGN KEY(course_id)
      REFERENCES course(course_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_user_account
    FOREIGN KEY(user_account_uid)
      REFERENCES user_account(user_account_uid)
      ON DELETE CASCADE
);

CREATE TABLE suggested_course (
  suggested_course_id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(150) NOT NULL,
  description VARCHAR(250) NOT NULL,
  tags text[] NOT NULL
);