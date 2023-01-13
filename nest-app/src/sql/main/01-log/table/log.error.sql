CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE main_log.error (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,

  message TEXT,
  host VARCHAR(255),
  url VARCHAR(255),
  stack TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);