CREATE TABLE IF NOT EXISTS dbo.plan (
    id SERIAL NOT NULL,
    name VARCHAR(45),
    duration INT,
    --
    PRIMARY KEY(id)
);