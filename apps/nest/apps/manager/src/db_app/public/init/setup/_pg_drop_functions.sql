CREATE OR REPLACE PROCEDURE _pg_drop_functions(
  functionNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  function_name TEXT;
BEGIN
  FOREACH function_name IN ARRAY functionNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP FUNCTION IF EXISTS ' || function_name;
      RAISE NOTICE 'Dropped function: %', function_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error dropping function %: %', function_name, SQLERRM;
    END;
  END LOOP;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE _pg_drop_functions(text[]) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE _pg_drop_functions(text[]) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;
