CREATE OR REPLACE FUNCTION _execute_script(scriptContent text)
RETURNS void AS $$
BEGIN
  -- Execute the script
  EXECUTE scriptContent;
  RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;