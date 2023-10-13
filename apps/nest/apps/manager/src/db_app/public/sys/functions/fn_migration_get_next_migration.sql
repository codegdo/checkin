CREATE OR REPLACE FUNCTION fn_migration_get_next_migration()
RETURNS migration AS $$
DECLARE
  last_migration migration;
  next_migration migration;
  next_execution_order INT;
BEGIN
  -- Initialize the next_migration record
  next_migration := NULL;

  -- Find the last executed migration
  SELECT * INTO last_migration FROM migration
  WHERE migration.is_executed = TRUE
  ORDER BY execution_order DESC
  LIMIT 1;

  -- If no migrations have been executed yet, find the first pending migration
  IF last_migration IS NULL THEN
    SELECT * INTO next_migration FROM migration
    WHERE migration.is_executed = FALSE
    ORDER BY execution_order ASC
    LIMIT 1;
  ELSE
    -- Find the next migration in order
    next_execution_order := last_migration.execution_order + 1;

    SELECT * INTO next_migration FROM migration
    WHERE migration.execution_order = next_execution_order
    AND migration.is_executed = FALSE;
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

REVOKE EXECUTE ON FUNCTION fn_migration_get_next_migration() FROM public;

-- SELECT * FROM fn_migration_get_next_migration();
