-- Create a table to store migration category
CREATE TABLE IF NOT EXISTS main_sys.migration_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50)
);