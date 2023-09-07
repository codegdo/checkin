-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS main_sys.migration_scripts (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    migration_rollback_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    comment TEXT,
    script_path VARCHAR(255) NOT NULL,
    script_order INT,
    execution_status VARCHAR(50) DEFAULT 'NotExecuted' CHECK (execution_status IN ('NotExecuted', 'InProgress', 'Completed', 'Failed')), -- Added script execution status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    FOREIGN KEY (migration_id) REFERENCES main_sys.migrations (id) ON DELETE CASCADE,
    FOREIGN KEY (migration_rollback_id) REFERENCES main_sys.migration_rollbacks (id) ON DELETE SET NULL
);