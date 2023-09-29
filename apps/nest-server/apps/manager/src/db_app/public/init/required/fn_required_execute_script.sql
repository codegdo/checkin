-- Create function fn_required_execute_script
CREATE OR REPLACE FUNCTION fn_required_execute_script(
  scriptContent text
)
RETURNS void AS $$
BEGIN

  -- Check if the current user has the EXECUTE privilege on fn_required_execute_script
  IF NOT has_function_privilege(current_user, 'fn_required_execute_script(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'User does not have EXECUTE privilege on function fn_required_execute_script';
  END IF;

  -- Execute the script
  EXECUTE scriptContent;
  RAISE NOTICE 'Script execution completed successfully.';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Script execution failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
