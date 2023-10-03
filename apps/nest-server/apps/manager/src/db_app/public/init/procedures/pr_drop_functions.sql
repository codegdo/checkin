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
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_drop_functions(text[]) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_drop_functions(text[]) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;