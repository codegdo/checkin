CREATE TABLE IF NOT EXISTS sec.session (
  id CHARACTER VARYING NOT NULL,
  json TEXT,
  expired_at BIGINT,
  --
  PRIMARY KEY(id)
);