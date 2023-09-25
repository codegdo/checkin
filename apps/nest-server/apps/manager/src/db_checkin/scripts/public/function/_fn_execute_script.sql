CREATE OR REPLACE FUNCTION _fn_execute_script(
    script_content text,
    schema_name text DEFAULT NULL,
    company_id int DEFAULT NULL
)
RETURNS void AS $$
DECLARE
    dynamic_script_content text;
BEGIN
    -- If both schema_name and company_id are provided, replace the schema name
    IF schema_name IS NOT NULL AND company_id IS NOT NULL THEN
      -- Use REGEXP_REPLACE to replace the schema name
      dynamic_script_content := REGEXP_REPLACE(
        script_content,
        format('%s', schema_name), -- Match schema_name specifically
        schema_name || '_' || company_id, -- Replace with schema_name_company_id
        'g' -- 'g' flag for global replacement
      );
    ELSE
      dynamic_script_content := script_content;
    END IF;

    -- Execute the script
    EXECUTE dynamic_script_content;
    RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
