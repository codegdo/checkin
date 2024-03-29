-- Create a table to track migration rollback history
CREATE TABLE IF NOT EXISTS migration_rollback (
  id SERIAL PRIMARY KEY,
  migration_id INT,
  status VARCHAR(50) DEFAULT 'NotRolledBack' CHECK (status IN ('NotRolledBack', 'InProgress', 'Completed', 'Failed')),
  error_message TEXT,

  started_at TIMESTAMP,
  duration INTERVAL,
  completed_at TIMESTAMP,
  
  is_rolledback BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),
  FOREIGN KEY (migration_id) REFERENCES migration (id) ON DELETE CASCADE
);

DO $$
DECLARE
  dbo_tables_and_functions INT;
BEGIN
  -- Find the ID of the 'Common Tables and Functions' migration
  SELECT id INTO dbo_tables_and_functions FROM migration WHERE name = 'Common Tables and Functions';

  -- Check if the 'migration_rollback' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration_rollback) THEN
    -- Insert data into the 'migration_rollback' table
    INSERT INTO migration_rollback (migration_id) VALUES
    (dbo_tables_and_functions);
  ELSE
    -- The 'migration_rollback' table has records
    RAISE NOTICE 'The migration_rollback table is not empty.';
  END IF;
END;
$$;