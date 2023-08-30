-- Create a table to track migration history
CREATE TABLE migration_history (
    id SERIAL PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL,
    migration_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    executed BOOLEAN NOT NULL DEFAULT FALSE,
    executed_by VARCHAR(255),
    execution_duration INTERVAL,
    rollback_script_path VARCHAR(255),
    rollback_description TEXT
);