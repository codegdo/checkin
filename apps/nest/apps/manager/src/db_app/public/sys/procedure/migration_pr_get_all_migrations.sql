/*
  Author: Giang Do
  Date: 09/18/2023
  Description: This stored procedure retrieves all migrations.

  @param {JSON} result
 */
CREATE OR REPLACE PROCEDURE migration_pr_get_all_migrations(
  OUT result JSON
)
AS $$
DECLARE
  migration_data JSON;
BEGIN
  -- Call the fn_migration_get_all_migrations() function and store the result
  SELECT json_agg(migrations.*)
  INTO migration_data
  FROM migration_fn_get_all_migrations() AS migrations;

  -- Set the result to the migration_data
  result := migration_data;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;


DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE migration_pr_get_all_migrations(out json) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE migration_pr_get_all_migrations(out json) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;

