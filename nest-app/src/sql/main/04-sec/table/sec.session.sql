-- CREATE TABLE SESSION
CREATE TABLE main_sec.session (
  id character varying PRIMARY KEY,
  data jsonb,
  expired_at bigint,
  destroyed_at date
);

CREATE TABLE main_sec.session (
  id character varying not null,
  data jsonb,
  expired_at bigint,
  destroyed_at date,
  --
  primary key(id)
);