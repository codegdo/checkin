CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS log.error (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,

    message VARCHAR(255),
    host VARCHAR(45),
    url VARCHAR(45),
    stack TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(id)
);