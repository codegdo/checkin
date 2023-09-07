-- Create a table to store migration tags
CREATE TABLE IF NOT EXISTS main_sys.migration_tags (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (migration_id) REFERENCES main_sys.migrations (id) ON DELETE CASCADE
);