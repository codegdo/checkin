-- Create extension if it doesn't already exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the 'main_sec.token' table
CREATE TABLE main_sec.token (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_type VARCHAR(50),
  token_key VARCHAR(100) UNIQUE NOT NULL,
  data JSONB,
  expiration BIGINT,
  created_at TIMESTAMP DEFAULT current_timestamp
);

