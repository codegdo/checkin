-- Create a table to track migration rollback history
CREATE TABLE IF NOT EXISTS main_sys.migration_rollback (
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
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50),
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id) ON DELETE CASCADE
);


DO $$
DECLARE
  setup_public_functions_id INT;
BEGIN
  -- Find the ID of the 'Setup Public Functions' migration
  SELECT id INTO setup_public_functions_id
  FROM main_sys.migration
  WHERE name = 'Setup Public Functions';

  -- Check if the migration with the name 'Setup Public Functions' exists
  IF setup_public_functions_id IS NOT NULL THEN
    -- Insert rolback 'Setup Public Functions'
    INSERT INTO main_sys.migration_rollback (migration_id) VALUES
    (setup_public_functions_id);

  ELSE
    -- Handle the case where the migration does not exist
    RAISE NOTICE 'Migration with name ''Setup Public Functions'' not found.';
  END IF;
END;
$$;