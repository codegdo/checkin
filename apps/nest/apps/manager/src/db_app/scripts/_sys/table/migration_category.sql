-- Create a table to store migration category
CREATE TABLE IF NOT EXISTS _sys.migration_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50)
);

INSERT INTO _sys.migration_category (name, description) VALUES
('Database Initialization', 'Creating and configuring the main database.');

/*
_sysAdmin
DBAdmin
SecurityAdmin
BackupAdmin
AdminUser
QAEngineer
UIAdmin
IntergrationAdmin
*/