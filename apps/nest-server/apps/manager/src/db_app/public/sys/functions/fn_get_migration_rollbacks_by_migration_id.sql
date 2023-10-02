CREATE OR REPLACE FUNCTION fn_get_migration_rollbacks_by_migration_id(migrationId INT)
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
  rollback_id INT;
BEGIN
  -- Find the corresponding migration rollback record
    SELECT mr.id 
    INTO rollback_id
    FROM migration_rollback mr
    WHERE mr.migration_id = migrationId;

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
    WHERE ms.migration_rollback_id = rollback_id;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_migration_rollbacks_by_migration_id(integer) FROM public;

-- SELECT * FROM fn_get_migration_rollbacks_by_migration_id(1);