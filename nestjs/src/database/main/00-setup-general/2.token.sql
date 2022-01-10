CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE TOKEN
CREATE TABLE IF NOT EXISTS sec.token (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,
  key VARCHAR(100),
  type VARCHAR(100),
  data JSONB,
  expired_at BIGINT,
  --
  PRIMARY KEY(id),
  UNIQUE(key)
);