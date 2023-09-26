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
LANGUAGE plpgsql
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
$$;

-- Example usage:
-- CALL pr_migration_get_scripts(1, null);
