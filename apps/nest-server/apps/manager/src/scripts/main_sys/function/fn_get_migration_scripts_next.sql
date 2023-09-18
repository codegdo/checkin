CREATE OR REPLACE FUNCTION main_sys.fn_get_migration_scripts_next(input_migration_id INT)
RETURNS SETOF main_sys.migration_script AS $$
DECLARE
  last_migration main_sys.migration;
  next_migration main_sys.migration;
  next_execution_order INT;
BEGIN
  -- Find the last executed migration
  SELECT * INTO last_migration FROM main_sys.migration
  WHERE is_executed = TRUE
  ORDER BY execution_order DESC
  LIMIT 1;

  -- If no migrations have been executed yet, find the first pending migration
  IF last_migration IS NULL THEN
    SELECT * INTO next_migration FROM main_sys.migration
    WHERE is_executed = FALSE
    ORDER BY execution_order ASC
    LIMIT 1;
  ELSE
    -- Find the next migration in order
    next_execution_order := last_migration.execution_order + 1;

    SELECT * INTO next_migration FROM main_sys.migration
    WHERE execution_order = next_execution_order
    AND is_executed = FALSE;
  END IF;

  -- Check if the next_migration has the same migration_id as the provided one
  IF next_migration.id = input_migration_id THEN
    -- Select all migration scripts for the provided migration_id
    RETURN QUERY
    SELECT ms.*
    FROM main_sys.migration_script ms
    WHERE ms.migration_id = input_migration_id;
  ELSE
    -- Handle the case where a migration with the provided migration_id is not the next one
    -- RAISE EXCEPTION 'Provided migration_id does not match the next migration: %', migration_id;
    RETURN;
  END IF;

END;
$$ LANGUAGE plpgsql;