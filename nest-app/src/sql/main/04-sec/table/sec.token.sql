CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TOKEN
CREATE TABLE main_sec.token (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key varchar(100) UNIQUE NOT NULL,
  type varchar(50),
  data jsonb,
  expired_at bigint,

  UNIQUE (key)
);

CREATE TABLE main_sec.token (
  id uuid default uuid_generate_v4() not null,
  key varchar(100),
  type varchar(100),
  data jsonb,
  expired_at bigint,
  --
  primary key(id),
  unique(key)
);

/*
  
*/