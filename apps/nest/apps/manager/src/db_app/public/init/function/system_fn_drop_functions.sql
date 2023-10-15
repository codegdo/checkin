CREATE OR REPLACE FUNCTION system_fn_drop_functions(
  functionNames TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
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
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_drop_functions(text[]) FROM public;