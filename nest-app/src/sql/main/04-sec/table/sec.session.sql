-- CREATE TABLE SESSION
CREATE TABLE main_sec.session (
  id character VARYING PRIMARY KEY,
  data jsonb,
  expiration bigint,
  deleted_at date
);
