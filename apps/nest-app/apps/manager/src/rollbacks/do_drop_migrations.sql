DO $$ 
DECLARE
  table_names TEXT[] := ARRAY[
    'main_sys.migration_metadata', 
    'main_sys.migration_tag', 
    'main_sys.migration_script', 
    'main_sys.migration_rollback', 
    'main_sys.migration_dependency', 
    'main_sys.migration'];
  table_name TEXT;
BEGIN
  -- Loop through the list of table names
  FOREACH table_name IN ARRAY table_names
  LOOP
    -- Attempt to drop the table using dynamic SQL
    EXECUTE 'DROP TABLE IF EXISTS ' || table_name;
    
    -- Check for errors
    IF NOT FOUND THEN
      -- Handle the exception here (you can log an error, raise an alert, etc.)
      RAISE NOTICE 'Error dropping table %', table_name;
    END IF;
  END LOOP;

  -- No explicit commit or rollback needed in a DO block
END $$;
