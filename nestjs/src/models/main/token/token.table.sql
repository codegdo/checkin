CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sec.token (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    data JSONB,
    expired_at BIGINT,
    --
    PRIMARY KEY(id)
);