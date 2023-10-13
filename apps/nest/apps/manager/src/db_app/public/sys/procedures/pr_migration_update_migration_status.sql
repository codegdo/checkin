/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure updates the migration table with migration status.

  @param {JSON} payload - JSON payload containing migration execution information.
  @param {VARCHAR} updatedBy - The user or entity updating the migration.
 */
CREATE OR REPLACE PROCEDURE pr_migration_update_migration_status(
  IN payload JSON,
  IN updatedBy TEXT
)
AS $$
DECLARE
  migration_id INT;
  migration_status VARCHAR;
BEGIN
  -- Extract payload from the JSON input
  migration_id := (payload->>'migrationId')::INT;
  migration_status := (payload->>'status')::VARCHAR;

  -- Validate the JSON input
  IF payload IS NULL OR
     migration_id IS NULL OR
     migration_status IS NULL THEN
    RAISE EXCEPTION 'Invalid JSON input format or missing fields';
  END IF;

  -- Check if the migration with the specified ID exists
  IF NOT EXISTS (SELECT 1 FROM migration WHERE id = migration_id) THEN
    RAISE EXCEPTION 'Migration with ID % does not exist', migration_id;
  END IF;

  -- Update the migration table
  UPDATE migration
  SET
    status = migration_status,
    updated_by = updatedBy
  WHERE
    id = migration_id;

END;
$$ SECURITY DEFINER LANGUAGE plpgsql;


DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_migration_update_migration_status(json, text) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_migration_update_migration_status(json, text) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;

