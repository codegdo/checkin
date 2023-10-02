-- Create procedure pr_required_run_script with access control check
CREATE OR REPLACE PROCEDURE pr_required_run_script(
  scriptContent text,
  schemaName text DEFAULT NULL,
  companyId int DEFAULT NULL
)
AS $$
DECLARE
  dynamic_scriptContent text;
BEGIN
  -- Check if the caller has the EXECUTE privilege on the procedure
  IF NOT has_function_privilege(current_user, 'pr_required_run_script(text, text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'User does not have EXECUTE privilege on procedure pr_required_run_script';
  END IF;

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
  --EXECUTE 'SELECT fn_required_execute_script($1)' USING dynamic_scriptContent;
  --PERFORM fn_required_execute_script(dynamic_scriptContent);

  RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

REVOKE EXECUTE ON PROCEDURE pr_required_run_script(text, text, integer) FROM public;