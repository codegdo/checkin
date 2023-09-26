-- Create a table to store migration tags
CREATE TABLE IF NOT EXISTS migration_tag (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (migration_id) REFERENCES migration (id) ON DELETE CASCADE
);

DO $$
DECLARE
  common_tables_and_functions INT;
BEGIN
  -- Find the ID of the 'Common Tables and Functions' migration
  SELECT id INTO common_tables_and_functions FROM migration WHERE name = 'Common Tables and Functions';

  -- Check if the 'migration_tag' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration_tag) THEN
    -- Insert data into the 'migration_tag' table
    INSERT INTO migration_tag (migration_id, name) VALUES
    (common_tables_and_functions,'Setup'),
    (common_tables_and_functions,'Database');
  ELSE
    -- The 'migration_tag' table has records
    RAISE NOTICE 'The migration_tag table is not empty.';
  END IF;

END;
$$;
