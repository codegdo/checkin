CREATE OR REPLACE FUNCTION main_sys.fn_get_migration_rollbacks_by_migration_id(input_migration_id INT)
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
    FROM main_sys.migration_rollback mr
    WHERE mr.migration_id = input_migration_id;

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
    FROM main_sys.migration_script ms
    WHERE ms.migration_rollback_id = rollback_id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM main_sys.fn_get_migration_rollbacks_by_migration_id(1);