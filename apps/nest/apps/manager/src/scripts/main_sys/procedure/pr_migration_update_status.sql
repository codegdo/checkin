/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure updates the main_sys.migration table with migration status.

  @param {JSON} payload - JSON payload containing migration execution information.
  @param {VARCHAR} updated_by - The user or entity updating the migration.
 */
CREATE OR REPLACE PROCEDURE main_sys.pr_migration_update_status(
  IN payload JSON,
  IN updated_user VARCHAR
)
LANGUAGE plpgsql
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
  IF NOT EXISTS (SELECT 1 FROM main_sys.migration WHERE id = migration_id) THEN
    RAISE EXCEPTION 'Migration with ID % does not exist', migration_id;
  END IF;

  -- Update the migration table
  UPDATE main_sys.migration
  SET
    status = migration_status,
    updated_by = updated_user
  WHERE
    id = migration_id;

END;
$$;

