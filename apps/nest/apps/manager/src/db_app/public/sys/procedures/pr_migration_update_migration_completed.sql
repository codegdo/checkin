/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure updates the migration table with migration
  execution details and inserts an audit record into the migration_audit table.

  @param {JSON} payload - JSON payload containing migration execution information.
  @param {VARCHAR} updatedBy - The user or entity updating the migration.
 */
CREATE OR REPLACE PROCEDURE pr_migration_update_migration_completed(
  IN payload JSON,
  IN updatedBy TEXT
)
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
  IF NOT EXISTS (SELECT 1 FROM migration WHERE id = migration_id) THEN
    RAISE EXCEPTION 'Migration with ID % does not exist', migration_id;
  END IF;

  -- Convert the duration from milliseconds to seconds
  migration_duration := migration_duration / 1000;

  -- Update the migration table
  UPDATE migration
  SET
    status = 'Completed',
    started_at = migration_started_at,
    completed_at = migration_completed_at,
    duration = migration_duration,
    is_executed = TRUE,
    updated_at = NOW(),
    updated_by = updatedBy
  WHERE
    id = migration_id;

  -- Insert an audit record into an audit table
  -- INSERT INTO migration_audit (migration_id, updated_at, updated_by)
  -- VALUES (migration_id, NOW(), updated_by);
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_migration_update_migration_completed(json, text) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_migration_update_migration_completed(json, text) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;

