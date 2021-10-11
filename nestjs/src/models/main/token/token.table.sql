CREATE TABLE IF NOT EXISTS sec.token (
    id TEXT NOT NULL,
    data JSONB,
    expired_at BIGINT,
    --
    PRIMARY KEY(id)
);