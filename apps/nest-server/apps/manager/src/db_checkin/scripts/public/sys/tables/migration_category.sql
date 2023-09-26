-- Create a table to store migration category
CREATE TABLE IF NOT EXISTS migration_category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50)
);

DO $$
DECLARE
  database_initialization INT;
BEGIN

  -- Check if the 'migration_category' table has no records
  IF (SELECT COUNT(*) FROM migration_category) = 0 THEN
    -- The 'migration_category' table is empty
    INSERT INTO migration_category (name, description) VALUES
    ('Database Initialization', 'Creating and configuring the main database.');
  ELSE
    -- The 'migration_category' table has records
    RAISE NOTICE 'The migration_category table is not empty.';
  END IF;

END;
$$;

