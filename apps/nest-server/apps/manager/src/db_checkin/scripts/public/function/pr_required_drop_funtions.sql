CREATE OR REPLACE PROCEDURE pr_required_drop_functions(
  function_names TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  function_name TEXT;
BEGIN
  FOREACH function_name IN ARRAY function_names
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP FUNCTION IF EXISTS ' || function_name;
      RAISE NOTICE 'Dropped function: %', function_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping function %: %', function_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;