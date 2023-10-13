-- Create a stored function to return the next migration record
CREATE OR REPLACE FUNCTION _sys.fn_get_migration_next()
RETURNS _sys.migration AS $$
DECLARE
  last_migration _sys.migration;
  next_migration _sys.migration;
  next_execution_order INT;
BEGIN
  -- Initialize the next_migration record
  next_migration := NULL;

  -- Find the last executed migration
  SELECT * INTO last_migration FROM _sys.migration
  WHERE _sys.migration.is_executed = TRUE
  ORDER BY execution_order DESC
  LIMIT 1;

  -- If no migrations have been executed yet, find the first pending migration
  IF last_migration IS NULL THEN
    SELECT * INTO next_migration FROM _sys.migration
    WHERE _sys.migration.is_executed = FALSE
    ORDER BY execution_order ASC
    LIMIT 1;
  ELSE
    -- Find the next migration in order
    next_execution_order := last_migration.execution_order + 1;

    SELECT * INTO next_migration FROM _sys.migration
    WHERE _sys.migration.execution_order = next_execution_order
    AND _sys.migration.is_executed = FALSE;
  END IF;

  -- Check for skipped migrations
  IF next_migration IS NULL THEN
    -- Handle the case where a migration has been skipped
    RAISE EXCEPTION 'Skipped migration detected: Expected migration order %', next_execution_order;
  END IF;

  -- Return the next_migration record
  RETURN next_migration;

END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM _sys.fn_get_next_migration();
