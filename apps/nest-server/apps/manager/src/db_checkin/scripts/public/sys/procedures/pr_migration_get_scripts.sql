/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure retrieves the migration and rollback scripts for a given migration ID and returns them as a JSON object.

  @param {INT} migration_id
  @param {JSON} result
 */
CREATE OR REPLACE PROCEDURE pr_migration_get_scripts(
  IN migration_id INT,
  OUT result JSON
)
LANGUAGE plpgsql
AS $$
DECLARE
  migration_scripts JSON;
  rollback_scripts JSON;
BEGIN
  -- Retrieve migration scripts and handle potential empty result with COALESCE
  SELECT COALESCE(
    (
      SELECT json_agg(json_build_object(
        'id', migration_data.id,
        'databaseName', migration_data.database_name,
        'schemaName', migration_data.schema_name,
        'objectType', migration_data.object_type,
        'name', migration_data.name,
        'scriptType', migration_data.script_type,
        'scriptPath', migration_data.script_path,
        'scriptOrder', migration_data.script_order
      ))
      FROM fn_get_migration_scripts_for_execution_next(migration_id) AS migration_data
    ), '[]'
  ) INTO migration_scripts;

  -- Check if migration_scripts exist
  IF migration_scripts IS NOT NULL THEN
    -- Retrieve rollback scripts using the migration script ID
    SELECT COALESCE(
      (
        SELECT json_agg(rollback_data) 
        FROM fn_get_migration_rollbacks_for_execution_next(migration_id) AS rollback_data
      ), '[]'
    ) INTO rollback_scripts;
  ELSE
    -- Set rollback_scripts to an empty JSON array if migration_scripts do not exist
    rollback_scripts := '[]'::JSON;
  END IF;

  -- Construct the final JSON result object
  result := jsonb_build_object('migrationScripts', migration_scripts, 'rollbackScripts', rollback_scripts);
END;
$$;

-- Example usage:
-- CALL pr_migration_get_scripts(1, null);
