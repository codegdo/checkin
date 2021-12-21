-- CREATE TABLE CALENDAR
CREATE TABLE IF NOT EXISTS org.calendar (
  id SERIAL NOT NULL,
  name VARCHAR(200),

  location_id INT,
  org_id INT,
  --
  PRIMARY KEY(id)
);

-- DROP
DROP TABLE IF EXISTS
org.calendar
CASCADE;