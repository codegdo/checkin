/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure retrieves the migration and rollback scripts for a given migration ID and returns them as a JSON object.

  @param {INT} migrationId
  @param {JSON} result
 */
CREATE OR REPLACE PROCEDURE pr_migration_get_rollbacks(
  IN migrationId INT,
  OUT result JSON
)
AS $$
DECLARE
  rollback_scripts JSON;
BEGIN
  -- Retrieve migration scripts and handle potential empty result with COALESCE
  SELECT COALESCE(
      (SELECT json_agg(migration_data) FROM fn_get_migration_scripts_next(migrationId) AS migration_data),
      '[]'
  ) INTO migration_scripts;

  -- Construct the final JSON result object
  result := jsonb_build_object('rollbackScripts', rollback_scripts);
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;


DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_migration_get_rollbacks(int, out json) FROM public;

  -- Check if 'api_app' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_app') THEN
    -- If 'api_app' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_migration_get_rollbacks(int, out json) TO api_app;
  ELSE
    -- If 'api_app' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_app'' does not exist.';
  END IF;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_migration_get_rollbacks(int, out json) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;


-- Example usage:
-- CALL pr_migration_get_rollbacks(1, null);
