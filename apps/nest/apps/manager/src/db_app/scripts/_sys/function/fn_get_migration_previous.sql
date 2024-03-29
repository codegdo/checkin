-- Create a stored function to return the previous migration record
CREATE OR REPLACE FUNCTION _sys.fn_get_migration_previous()
RETURNS _sys.migration AS $$
DECLARE
  last_migration _sys.migration;
  previous_migration _sys.migration;
  previous_execution_order INT;
BEGIN
  -- Initialize the previous_migration record
  previous_migration := NULL;

  -- Find the last executed migration
  SELECT * INTO last_migration FROM _sys.migration
  WHERE _sys.migration.is_executed = TRUE
  ORDER BY execution_order DESC
  LIMIT 1;

  -- If no migrations have been executed yet or the last executed migration is the first one, return NULL
  IF last_migration IS NULL OR last_migration.execution_order = 0 THEN
    RETURN NULL;
  ELSE
    -- Find the previous migration in order
    previous_execution_order := last_migration.execution_order - 1;

    SELECT * INTO previous_migration FROM _sys.migration
    WHERE _sys.migration.execution_order = previous_execution_order
    AND _sys.migration.is_executed = TRUE;
  END IF;

  -- Return the previous_migration record
  RETURN previous_migration;

END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM _sys.fn_get_previous_migration();
