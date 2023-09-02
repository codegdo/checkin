-- Create a table to track migration rollback history
CREATE TABLE IF NOT EXISTS main_sys.migration_rollback (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    migration_script_id INT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Failed')),
    error_message TEXT,

    rollback_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rollback_duration INTERVAL,
    rollback_sequence INT,
    rollback_attempts INT DEFAULT 0,
    rollback_completed_at TIMESTAMP,

    is_rolledback BOOLEAN NOT NULL DEFAULT TRUE, -- Indicates whether it's a rollback operation
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50),
    
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id),
    FOREIGN KEY (migration_script_id) REFERENCES main_sys.migration_script (id)
);