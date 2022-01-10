CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE SESSION
CREATE TABLE IF NOT EXISTS sec.session (
  id CHARACTER VARYING NOT NULL,
  json TEXT,
  expired_at BIGINT,
  --
  PRIMARY KEY(id)
);

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

-- CREATE TABLE ERROR
CREATE TABLE IF NOT EXISTS log.error (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,

  message TEXT,
  host VARCHAR(255),
  url VARCHAR(255),
  stack TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(id)
);