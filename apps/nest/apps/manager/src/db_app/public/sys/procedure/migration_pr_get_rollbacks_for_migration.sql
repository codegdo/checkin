/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure retrieves the migration and rollback scripts for a given migration ID and returns them as a JSON object.

  @param {INT} migrationId
  @param {JSON} result
 */
CREATE OR REPLACE PROCEDURE migration_pr_get_rollbacks_for_migration(
  IN migrationId INT,
  OUT result JSON
)
AS $$
DECLARE
  rollback_scripts JSON;
BEGIN
  -- Retrieve migration scripts and handle potential empty result with COALESCE
  SELECT COALESCE(
      (SELECT json_agg(migration_data) FROM migration_fn_get_rollbacks_for_migration(migrationId) AS migration_data),
      '[]'
  ) INTO rollback_scripts;

  -- Construct the final JSON result object
  result := jsonb_build_object('rollbackScripts', rollback_scripts);
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE migration_pr_get_rollbacks_for_migration(int, out json) FROM public;

  -- Check if 'api_user' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_user') THEN
    -- If 'api_user' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE migration_pr_get_rollbacks_for_migration(int, out json) TO api_user;
  ELSE
    -- If 'api_user' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_user'' does not exist.';
  END IF;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE migration_pr_get_rollbacks_for_migration(int, out json) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;

-- Example usage:
-- CALL migration_pr_get_rollbacks(1, null);
