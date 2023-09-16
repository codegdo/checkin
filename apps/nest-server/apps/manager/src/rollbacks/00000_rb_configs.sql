DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'main_sys.fn_get_config_by_key',
    'main_sys.fn_is_config_key_boolean'
  ]::TEXT[];
  function_name TEXT;

  table_names TEXT[] := ARRAY[
    'main_sys.config'
  ]::TEXT[];
  table_name TEXT;
BEGIN
  -- Functions
  FOREACH function_name IN ARRAY function_names
  LOOP

    EXECUTE 'DROP FUNCTION IF EXISTS ' || function_name;
    
    IF NOT FOUND THEN
      RAISE NOTICE 'Error dropping function %', function_name;
    END IF;
  END LOOP;

  -- Tables
  FOREACH table_name IN ARRAY table_names
  LOOP

    EXECUTE 'DROP TABLE IF EXISTS ' || table_name;
    
    IF NOT FOUND THEN
      RAISE NOTICE 'Error dropping table %', table_name;
    END IF;
  END LOOP;

  -- No explicit commit or rollback needed in a DO block
END $$;
