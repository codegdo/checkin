DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'main_sys.fn_get_migration_all',
    'main_sys.fn_get_migration_by_category',
    'main_sys.fn_get_migration_by_id',
    'main_sys.fn_get_migration_next',
    'main_sys.fn_get_migration_previous'
  ]::TEXT[];
  function_name TEXT;

  table_names TEXT[] := ARRAY[
    'main_sys.migration_metadata', 
    'main_sys.migration_tag', 
    'main_sys.migration_script', 
    'main_sys.migration_rollback', 
    'main_sys.migration_dependency', 
    'main_sys.migration',
    'main_sys.migration_category'];
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
