/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure retrieves the migration and rollback scripts for a given migration ID and returns them as a JSON object.

  @param {INT} migrationId
  @param {JSON} result
 */
CREATE OR REPLACE PROCEDURE pr_migration_get_scripts_by_id(
  IN migrationId INT,
  OUT result JSON
)
AS $$
DECLARE
  scripts JSON;
  rollback_scripts JSON;
BEGIN
  -- Check if the caller has the EXECUTE privilege on the functions
  -- no OUT json arguement when check procedure function
  IF NOT has_function_privilege(current_user, 'pr_migration_get_scripts_by_id(int)', 'EXECUTE') THEN
    RAISE EXCEPTION 'User does not have EXECUTE privilege on functions pr_migration_get_scripts_by_id';
  END IF;

  -- Retrieve migration scripts and handle potential empty result with COALESCE
  SELECT COALESCE(
    (
      SELECT json_agg(json_build_object(
        'id', migration_data.id,
        'databaseName', migration_data.database_name,
        'schemaName', migration_data.schema_name,
        'objectType', migration_data.object_type,
        'category', migration_data.category,
        'migration', migration_data.migration,
        'scriptName', migration_data.name,
        'scriptType', migration_data.script_type,
        'scriptPath', migration_data.script_path,
        'scriptOrder', migration_data.script_order,
        'isRequired', migration_data.is_required
      ))
      FROM fn_get_migration_scripts_for_execution_next(migrationId) AS migration_data
    ), '[]'
  ) INTO scripts;

  -- Check if migration_scripts exist
  IF scripts IS NOT NULL THEN
    -- Retrieve rollback scripts using the migration script ID
    SELECT COALESCE(
      (
        SELECT json_agg(rollback_data) 
        FROM fn_get_migration_rollbacks_for_execution_next(migrationId) AS rollback_data
      ), '[]'
    ) INTO rollback_scripts;
  ELSE
    -- Set rollback_scripts to an empty JSON array if migration_scripts do not exist
    rollback_scripts := '[]'::JSON;
  END IF;

  -- Construct the final JSON result object
  result := jsonb_build_object('scripts', scripts, 'rollbackScripts', rollback_scripts);
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;


DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_migration_get_scripts_by_id(int, out json) FROM public;

  -- Check if 'api_app' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_app') THEN
    -- If 'api_app' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_migration_get_scripts_by_id(int, out json) TO api_app;
  ELSE
    -- If 'api_app' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_app'' does not exist.';
  END IF;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_migration_get_scripts_by_id(int, out json) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;

-- Example usage:
-- CALL pr_migration_get_scripts_by_id(1, null);
