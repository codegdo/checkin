CREATE TABLE IF NOT EXISTS dbo.subscription_plan (
    id SERIAL NOT NULL,
    name VARCHAR(45),
    description VARCHAR(255),
    duration INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(45) DEFAULT CURRENT_USER,
    updated_by VARCHAR(45),
    --
    PRIMARY KEY(id)
);