CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE main_log.error (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  message varchar(255) NOT NULL,
  host varchar(50) NOT NULL,
  url text NOT NULL,
  stack text NOT NULL,

  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);