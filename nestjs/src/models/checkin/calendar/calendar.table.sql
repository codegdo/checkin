-- CREATE TABLE CALENDAR
CREATE TABLE IF NOT EXISTS org.calendar (
  id SERIAL NOT NULL,
  name CHARACTER VARYING(200),

  location_id INT,
  org_id INT,
  --
  PRIMARY KEY(id)
);