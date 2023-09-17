DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'fn_camel_case_split',
    'fn_generate_random_string',
    'fn_split_lookup_string_to_json',
    'fn_updated_at'
  ]::TEXT[];
  function_name TEXT;

  table_names TEXT[] := ARRAY[]::TEXT[];
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
