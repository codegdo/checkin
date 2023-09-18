CREATE OR REPLACE FUNCTION _fn_drop_functions(function_names TEXT[])
RETURNS void AS $$
DECLARE
  function_name TEXT;
BEGIN
  FOREACH function_name IN ARRAY function_names
  LOOP
    EXECUTE 'DROP FUNCTION IF EXISTS ' || function_name;

    IF NOT FOUND THEN
      RAISE NOTICE 'Error dropping function %', function_name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;