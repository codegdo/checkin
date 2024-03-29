/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure updates the main_sys.migration table with migration
  execution details and inserts an audit record into the main_sys.migration_audit table.

  @param {JSON} payload - JSON payload containing migration execution information.
  @param {VARCHAR} updated_by - The user or entity updating the migration.
 */
CREATE OR REPLACE PROCEDURE main_sys.pr_migration_update_complete(
  IN payload JSON,
  IN updated_user VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
  migration_id INT;
  migration_started_at TIMESTAMP;
  migration_completed_at TIMESTAMP;
  migration_duration INTERVAL;
BEGIN
  -- Extract payload from the JSON input
  migration_id := (payload->>'migrationId')::INT;
  migration_started_at := (payload->>'startedAt')::TIMESTAMP;
  migration_completed_at := (payload->>'completedAt')::TIMESTAMP;
  migration_duration := (payload->>'duration')::INT; -- Extract duration as INT for milliseconds

  -- Validate the JSON input
  IF payload IS NULL OR
     migration_id IS NULL OR
     migration_started_at IS NULL OR
     migration_completed_at IS NULL OR
     migration_duration IS NULL THEN
    RAISE EXCEPTION 'Invalid JSON input format or missing fields';
  END IF;

  -- Check if the migration with the specified ID exists
  IF NOT EXISTS (SELECT 1 FROM main_sys.migration WHERE id = migration_id) THEN
    RAISE EXCEPTION 'Migration with ID % does not exist', migration_id;
  END IF;

  -- Convert the duration from milliseconds to seconds
  migration_duration := migration_duration / 1000;

  -- Update the migration table
  UPDATE main_sys.migration
  SET
    status = 'Completed',
    started_at = migration_started_at,
    completed_at = migration_completed_at,
    duration = migration_duration,
    is_executed = TRUE,
    updated_at = NOW(),
    updated_by = updated_user
  WHERE
    id = migration_id;

  -- Insert an audit record into an audit table
  -- INSERT INTO main_sys.migration_audit (migration_id, updated_at, updated_by)
  -- VALUES (migration_id, NOW(), updated_by);
END;
$$;

