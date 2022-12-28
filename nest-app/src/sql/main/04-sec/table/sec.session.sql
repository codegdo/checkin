-- CREATE TABLE SESSION
CREATE TABLE sec.session (
  id character varying not null,
  data jsonb,
  expired_at bigint,
  --
  primary key(id)
);