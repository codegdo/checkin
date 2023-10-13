CREATE OR REPLACE PROCEDURE pr_system_run_script(
  scriptContent text,
  schemaName text DEFAULT NULL,
  companyId int DEFAULT NULL
)
AS $$
DECLARE
  dynamic_scriptContent text;
BEGIN
  -- If both schemaName and companyId are provided, replace the schema name
  IF schemaName IS NOT NULL AND companyId IS NOT NULL THEN
    -- Use REGEXP_REPLACE to replace the schema name
    dynamic_scriptContent := REGEXP_REPLACE(
      scriptContent,
      format('%s', schemaName), -- Match schemaName specifically
      schemaName || '_' || companyId, -- Replace with schemaName_companyId
      'g' -- 'g' flag for global replacement
    );
  ELSE
    dynamic_scriptContent := scriptContent;
  END IF;

  -- Execute the script
  EXECUTE dynamic_scriptContent;
  --EXECUTE 'SELECT fn_system_execute_script($1)' USING dynamic_scriptContent;
  --PERFORM fn_system_execute_script(dynamic_scriptContent);

  RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_system_run_script(text, text, int) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_system_run_script(text, text, int) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;
