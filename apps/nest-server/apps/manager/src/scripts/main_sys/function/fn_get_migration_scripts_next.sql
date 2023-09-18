CREATE OR REPLACE FUNCTION main_sys.fn_get_migration_scripts_next(input_migration_id INT)
RETURNS TABLE (
  id INT,
  database VARCHAR,
  schema VARCHAR,
  "objectType" VARCHAR,
  name VARCHAR,
  "scriptType" VARCHAR,
  "scriptPath" VARCHAR,
  "scriptOrder" INT
) AS $$
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
    SELECT 
      ms.id,
      ms.database,
      ms.schema,
      ms.object_type,
      ms.name,
      ms.script_type,
      ms.script_path,
      ms.script_order
    FROM main_sys.migration_script ms
    WHERE ms.migration_id = input_migration_id;
  ELSE
    -- Handle the case where a migration with the provided migration_id is not the next one
    RETURN QUERY SELECT NULL::INT, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::INT;
  END IF;
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM main_sys.fn_get_migration_scripts_next(1);