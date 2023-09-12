-- Create a table to track migration rollback history
CREATE TABLE IF NOT EXISTS main_sys.migration_rollback (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    status VARCHAR(50) DEFAULT 'NotRolledBack' CHECK (status IN ('NotRolledBack', 'InProgress', 'Completed', 'Failed')),
    error_message TEXT,

    started_at TIMESTAMP,
    duration INTERVAL,
    completed_at TIMESTAMP,
    
    is_rolledback BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50),
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id) ON DELETE CASCADE
);

INSERT INTO main_sys.migration_rollback (migration_id) VALUES
(1);