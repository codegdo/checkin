CREATE OR REPLACE FUNCTION migration_fn_get_rollbacks_for_migration(migrationId INT)
RETURNS TABLE (
  id INT,
  name VARCHAR,
  script_type VARCHAR,
  script_path VARCHAR,
  script_order INT
) SECURITY DEFINER AS $$
DECLARE
  last_migration_executed migration;
  rollback_id INT;
BEGIN
  -- Find the last executed migration
  SELECT * INTO last_migration_executed
  FROM migration
  WHERE is_executed = TRUE
  ORDER BY execution_order DESC
  LIMIT 1;

  -- If no migrations have been executed yet or the provided migration_id is not the next one
  IF last_migration_executed IS NULL OR last_migration_executed.id <> migrationId THEN
    RETURN;
  ELSE
    -- Find the corresponding migration rollback record
    SELECT mr.id 
    INTO rollback_id
    FROM migration_rollback mr
    WHERE mr.migration_id = migrationId;

    -- Select all migration scripts for the provided migration_id
    RETURN QUERY
    SELECT
      ms.id,
      ms.name,
      ms.script_type,
      ms.script_path,
      ms.script_order
    FROM migration_script ms
    WHERE ms.migration_rollback_id = rollback_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION migration_fn_get_rollbacks_for_migration(integer) FROM public;

-- SELECT * FROM migration_fn_get_rollbacks_for_migration(1);
