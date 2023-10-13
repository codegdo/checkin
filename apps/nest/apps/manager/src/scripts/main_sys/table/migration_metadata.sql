-- Create a table to store custom metadata for migrations
CREATE TABLE IF NOT EXISTS main_sys.migration_metadata (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    key VARCHAR(50) NOT NULL,
    value TEXT,
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
    -- Insert custom metadata for the 'Setup Public Functions' migration
    INSERT INTO main_sys.migration_metadata (migration_id, key, value)
    VALUES
      (setup_public_functions_id, 'Author', 'John Doe'),
      (setup_public_functions_id, 'Version', '1.0.0'),
      (setup_public_functions_id, 'Description', 'Initial setup of public functions');
  ELSE
    -- Handle the case where the migration does not exist
    RAISE EXCEPTION 'Migration with name ''Setup Public Functions'' not found.';
  END IF;
END;
$$;
