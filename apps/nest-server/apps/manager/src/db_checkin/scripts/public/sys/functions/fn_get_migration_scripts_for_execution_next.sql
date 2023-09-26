CREATE OR REPLACE FUNCTION fn_get_migration_scripts_for_execution_next(input_migration_id INT)
RETURNS TABLE (
  id INT,
  database_name VARCHAR,
  schema_name VARCHAR,
  object_type VARCHAR,
  name VARCHAR,
  script_type VARCHAR,
  script_path VARCHAR,
  script_order INT
) AS $$
DECLARE
  last_migration migration;
  next_migration migration;
  next_execution_order INT;
BEGIN
  -- Find the last executed migration
  SELECT * INTO last_migration FROM migration
  WHERE is_executed = TRUE
  ORDER BY execution_order DESC
  LIMIT 1;

  -- If no migrations have been executed yet, find the first pending migration
  IF last_migration IS NULL THEN
    SELECT * INTO next_migration FROM migration
    WHERE is_executed = FALSE
    ORDER BY execution_order ASC
    LIMIT 1;
  ELSE
    -- Find the next migration in order
    next_execution_order := last_migration.execution_order + 1;

    SELECT * INTO next_migration FROM migration
    WHERE execution_order = next_execution_order
    AND is_executed = FALSE;
  END IF;

  -- Check if the next_migration has the same migration_id as the provided one
  IF next_migration.id = input_migration_id THEN
    -- Select all migration scripts for the provided migration_id
    RETURN QUERY
    SELECT 
      ms.id,
      ms.database_name,
      ms.schema_name,
      ms.object_type,
      ms.name,
      ms.script_type,
      ms.script_path,
      ms.script_order
    FROM migration_script ms
    WHERE ms.migration_id = input_migration_id;
  ELSE
    -- Handle the case where a migration with the provided migration_id is not the next one
    RETURN;
  END IF;
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM fn_get_migration_scripts_for_execution_next(1);