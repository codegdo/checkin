-- Create a table to track migration history
CREATE TABLE IF NOT EXISTS migration (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,

  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Failed')),
  error_message TEXT,

  started_at TIMESTAMP,
  duration INTERVAL,
  completed_at TIMESTAMP,
  execution_order INT DEFAULT 0,

  is_executed BOOLEAN NOT NULL DEFAULT FALSE,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  has_dependent BOOLEAN DEFAULT FALSE,

  app_version VARCHAR(50),
  build_version VARCHAR(50),
  commit_hash VARCHAR(40),
  checksum VARCHAR(64),
  environment VARCHAR(50),

  is_enabled BOOLEAN DEFAULT TRUE,

  migration_category_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),
  FOREIGN KEY (migration_category_id) REFERENCES migration_category (id) ON DELETE CASCADE
);

DO $$
DECLARE
  database_initialization INT;
BEGIN
  -- Find the ID of the 'Database Initialization' migration category
  SELECT id INTO database_initialization FROM migration_category WHERE name = 'Database Initialization';

  -- Check if the 'migration' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration) THEN
    -- Insert data into the 'migration' table
    INSERT INTO migration (migration_category_id, name, description, execution_order, app_version, is_required) VALUES
    (database_initialization,'Common Tables and Functions','Initializes common tables and functions in the database.',0,'1.0.0',TRUE);
  ELSE
    -- The 'migration' table has records
    RAISE NOTICE 'The migration table is not empty.';
  END IF;
END;
$$;