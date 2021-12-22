CREATE TABLE IF NOT EXISTS dbo.plan (
    id SERIAL NOT NULL,
    name VARCHAR(45),
    duration INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(45) DEFAULT CURRENT_USER,
    updated_by VARCHAR(45),
    --
    PRIMARY KEY(id)
);