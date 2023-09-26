CREATE OR REPLACE PROCEDURE pr_required_run_script(
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
  RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
