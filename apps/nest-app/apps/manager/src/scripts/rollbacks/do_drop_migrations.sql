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
