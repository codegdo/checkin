CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TOKEN
CREATE TABLE main_sec.token (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_type varchar(50),
  token_key varchar(100) UNIQUE NOT NULL,
  data jsonb,
  expiration bigint,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
);
