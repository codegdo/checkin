CREATE TABLE IF NOT EXISTS sec.session (
    id TEXT NOT NULL,
    json TEXT,
    expired_at BIGINT,
    --
    PRIMARY KEY(id)
);