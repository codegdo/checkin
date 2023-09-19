/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure updates the main_sys.migration table with migration
  execution details and inserts an audit record into the main_sys.migration_audit table.

  @param {JSON} data - JSON data containing migration execution information.
  @param {VARCHAR} updated_by - The user or entity updating the migration.
 */
CREATE OR REPLACE PROCEDURE main_sys.pr_migration_get_update(
  IN data JSON,
  IN updated_by VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
  migration_id INT;
  started_at TIMESTAMP;
  completed_at TIMESTAMP;
  duration INTERVAL;
BEGIN
  -- Extract data from the JSON input
  migration_id := (data->>'migrationId')::INT;
  started_at := (data->>'startedAt')::TIMESTAMP;
  completed_at := (data->>'completedAt')::TIMESTAMP;
  duration := (data->>'duration')::INTERVAL;

  -- Validate the JSON input
  IF data IS NULL OR
     migration_id IS NULL OR
     started_at IS NULL OR
     completed_at IS NULL OR
     duration IS NULL THEN
    RAISE EXCEPTION 'Invalid JSON input format or missing fields';
  END IF;

  -- Check if the migration with the specified ID exists
  IF NOT EXISTS (SELECT 1 FROM main_sys.migration WHERE id = migration_id) THEN
    RAISE EXCEPTION 'Migration with ID % does not exist', migration_id;
  END IF;

  -- Update the migration table
  UPDATE main_sys.migration
  SET
    started_at = started_at,
    completed_at = completed_at,
    duration = duration,
    is_executed = TRUE,
    updated_at = NOW(),
    updated_by = updated_by
  WHERE
    id = migration_id;

  -- Insert an audit record into an audit table
  -- INSERT INTO main_sys.migration_audit (migration_id, updated_at, updated_by)
  -- VALUES (migration_id, NOW(), updated_by);
END;
$$;

