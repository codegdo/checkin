CREATE OR REPLACE PROCEDURE pr_drop_functions(
  functionNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  function_name TEXT;
BEGIN
  -- Check if the caller has the EXECUTE privilege on the functions
  IF NOT has_function_privilege(current_user, 'fn_required_drop_functions(text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'User does not have EXECUTE privilege on functions fn_required_drop_functions';
  END IF;

  -- Execute the function
  PERFORM fn_required_drop_functions(functionNames);
END;
$$ LANGUAGE plpgsql;