-- Create a table to store custom metadata for migrations
CREATE TABLE IF NOT EXISTS main_sys.migration_metadata (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    metadata_key VARCHAR(50) NOT NULL,
    metadata_value TEXT,
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id) ON DELETE CASCADE
);