-- Create a table to track migration history
CREATE TABLE IF NOT EXISTS sys.migration (
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
  has_dependent BOOLEAN DEFAULT FALSE,

  app_version INT,
  build_version VARCHAR(50),
  commit_hash VARCHAR(40),
  checksum VARCHAR(64),
  environment VARCHAR(50),

  is_enabled BOOLEAN DEFAULT TRUE,

  migration_category_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),
  FOREIGN KEY (migration_category_id) REFERENCES sys.migration_category (id) ON DELETE CASCADE
);

DO $$
DECLARE
  database_initialization_id INT;
BEGIN
  -- Find the ID of the 'Database Initialization' migration category
  SELECT id INTO database_initialization_id
  FROM sys.migration_category
  WHERE name = 'Database Initialization';

  -- Check if the migration category with the name 'Database Initialization' exists
  IF database_initialization_id IS NOT NULL THEN
    -- Insert migration 'Setup Public Functions'
    INSERT INTO sys.migration (migration_category_id, name, description, execution_order, app_version) VALUES
    (database_initialization_id,'Setup Public Functions','Setup public functions for the application.',0,1);
  ELSE
    -- Handle the case where the migration does not exist
    RAISE NOTICE 'Migration Category with name ''Database Initialization'' not found.';
  END IF;
END;
$$;