-- Create a table to store custom metadata for migrations
CREATE TABLE IF NOT EXISTS migration_metadata (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    key VARCHAR(50) NOT NULL,
    value TEXT,
    FOREIGN KEY (migration_id) REFERENCES migration (id) ON DELETE CASCADE
);

DO $$
DECLARE
  common_tables_and_functions INT;
BEGIN
  -- Find the ID of the 'Common Tables and Functions' migration
  SELECT id INTO common_tables_and_functions FROM migration WHERE name = 'Common Tables and Functions';

  -- Check if the 'migration_metadata' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration_metadata) THEN
    -- Insert data into the 'migration_metadata' table
    INSERT INTO migration_metadata (migration_id, key, value) VALUES
    (common_tables_and_functions,'Author','John Doe'),
    (common_tables_and_functions,'Version','1.0.0'),
    (common_tables_and_functions,'Description','Initial setup of common tables and functions.');
  ELSE
    -- The 'migration_metadata' table has records
    RAISE NOTICE 'The migration_metadata table is not empty.';
  END IF;

END;
$$;
