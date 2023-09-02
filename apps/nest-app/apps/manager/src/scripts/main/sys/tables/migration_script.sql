-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS main_sys.migration_script (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    comment TEXT,

    script_path VARCHAR(255) NOT NULL,
    script_order INT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id)
);