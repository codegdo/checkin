CREATE OR REPLACE FUNCTION system_fn_execute_script(
  scriptContent text
)
RETURNS void AS $$
BEGIN
  -- Execute the script
  EXECUTE quote_literal(scriptContent);
  RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_execute_script(text) FROM public;
