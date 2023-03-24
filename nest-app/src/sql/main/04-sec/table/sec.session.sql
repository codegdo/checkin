-- CREATE TABLE SESSION
CREATE TABLE main_sec.session (
  id character varying PRIMARY KEY,
  data jsonb,
  expired_at bigint,
  deleted_at date
);
