-- Create a table to store migration tags
CREATE TABLE IF NOT EXISTS migration_tag (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (migration_id) REFERENCES migration (id) ON DELETE CASCADE
);


DO $$
DECLARE
  setup_public_functions_id INT;
BEGIN
  -- Find the ID of the 'Setup Public Functions' migration
  SELECT id INTO setup_public_functions_id
  FROM migration
  WHERE name = 'Setup Public Functions';

  -- Check if the migration with the name 'Setup Public Functions' exists
  IF setup_public_functions_id IS NOT NULL THEN
    -- Insert custom metadata for the 'Setup Public Functions' migration
    INSERT INTO migration_tag (migration_id, name)
    VALUES
      (setup_public_functions_id, 'Functionality'),
      (setup_public_functions_id, 'Setup'),
      (setup_public_functions_id, 'Database');
  ELSE
    -- Handle the case where the migration does not exist
    RAISE NOTICE 'Migration with name ''Setup Public Functions'' not found.';
  END IF;
END;
$$;
