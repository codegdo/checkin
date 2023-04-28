-- Create the 'main_sec.session' table
CREATE TABLE main_sec.session (
  id CHARACTER VARYING PRIMARY KEY,
  data JSONB,
  expiration BIGINT,
  deleted_at DATE
);

