-- Create a table to track migration rollback history
CREATE TABLE main_sys.migration_rollback (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    migration_script_id INT,
    
    rollback_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rolled_back_by VARCHAR(255),
    rollback_script_id INT,
    rollback_description TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Failed')),
    completed_at TIMESTAMP,
    error_message TEXT,
    is_rollback BOOLEAN NOT NULL DEFAULT TRUE, -- Indicates whether it's a rollback operation
    FOREIGN KEY (migration_id) REFERENCES migration_management.migration (id),
    FOREIGN KEY (rollback_script_id) REFERENCES migration_management.migration_script (id)
);