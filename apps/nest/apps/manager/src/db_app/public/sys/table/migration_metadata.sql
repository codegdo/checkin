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
  dbo_tables_and_functions INT;
BEGIN
  -- Find the ID of the 'Dbo Tables and Functions' migration
  SELECT id INTO dbo_tables_and_functions FROM migration WHERE name = 'Dbo Tables and Functions';

  -- Check if the 'migration_metadata' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration_metadata) THEN
    -- Insert data into the 'migration_metadata' table
    INSERT INTO migration_metadata (migration_id, key, value) VALUES
    (dbo_tables_and_functions,'Author','John Doe'),
    (dbo_tables_and_functions,'Version','1.0.0'),
    (dbo_tables_and_functions,'Description','Initial setup of dbo tables and functions.');
  ELSE
    -- The 'migration_metadata' table has records
    RAISE NOTICE 'The migration_metadata table is not empty.';
  END IF;

END;
$$;
