-- drop_tables_with_do.sql

-- Drop multiple tables using a DO block

DO $$ 
BEGIN
  -- List the tables to drop
  DECLARE
    tables_to_drop text[] := ARRAY['customers', 'orders', 'products'];
    
  -- Loop through the list and drop each table if it exists
  FOR i IN array_lower(tables_to_drop, 1)..array_upper(tables_to_drop, 1) LOOP
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tables_to_drop[i]) THEN
      EXECUTE 'DROP TABLE ' || tables_to_drop[i];
      RAISE NOTICE 'Dropped table %', tables_to_drop[i];
    ELSE
      RAISE NOTICE 'Table % does not exist', tables_to_drop[i];
    END IF;
  END LOOP;
END $$;

DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations') THEN
    DROP TABLE IF EXISTS main_sys.migrations
  END IF;
END $$;

DO $$ 
BEGIN
  DROP TABLE IF EXISTS main_sys.migrations;
END $$;

DO $$ 
DECLARE
  table_exists BOOLEAN;
BEGIN
  -- Check if the table exists
  SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'main_sys' AND table_name = 'migrations') INTO table_exists;
  
  -- If the table exists, attempt to drop it
  IF table_exists THEN
    BEGIN
      -- Savepoint for rollback
      SAVEPOINT drop_table_savepoint;
      
      -- Attempt to drop the table
      DROP TABLE main_sys.migrations;
      
      -- If successful, release the savepoint (commit)
      RELEASE SAVEPOINT drop_table_savepoint;
    EXCEPTION
      WHEN others THEN
        -- Handle the exception here (you can log an error, raise an alert, etc.)
        RAISE NOTICE 'Error dropping table: %', SQLERRM;
        
        -- Rollback to the savepoint in case of an error
        ROLLBACK TO SAVEPOINT drop_table_savepoint;
    END;
  END IF;
END $$;


