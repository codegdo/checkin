-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS main_sys.migration_script (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    migration_rollback_id INT,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    comment TEXT,

    database VARCHAR(50) NOT NULL,
    schema VARCHAR(50) NOT NULL,
    object_type VARCHAR(50) NOT NULL CHECK (object_type IN ('table', 'function', 'trigger', 'procedure', 'synonym', 'view')),

    script_type VARCHAR(10) NOT NULL DEFAULT 'sql' CHECK (script_type IN ('sql')),
    script_path VARCHAR(255) NOT NULL,
    execution_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id) ON DELETE CASCADE,
    FOREIGN KEY (migration_rollback_id) REFERENCES main_sys.migration_rollback (id) ON DELETE SET NULL
);
