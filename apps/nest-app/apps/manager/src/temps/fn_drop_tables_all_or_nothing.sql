-- Define a PL/pgSQL function to drop multiple tables with all-or-nothing rollback
CREATE OR REPLACE FUNCTION drop_tables_all_or_nothing(table_names TEXT[])
RETURNS VOID AS $$
DECLARE
  table_name TEXT;
BEGIN
  -- Savepoint for all-or-nothing rollback
  SAVEPOINT drop_tables_savepoint;

  -- Iterate through the list of table names
  FOREACH table_name IN ARRAY table_names
  LOOP
    -- Attempt to drop the table
    BEGIN
      EXECUTE 'DROP TABLE IF EXISTS ' || table_name;
    EXCEPTION
      WHEN others THEN
        -- Handle the exception here (you can log an error, raise an alert, etc.)
        RAISE NOTICE 'Error dropping table %: %', table_name, SQLERRM;

        -- Rollback all changes if any error occurs
        ROLLBACK TO SAVEPOINT drop_tables_savepoint;
        RETURN;
    END;
  END LOOP;

  -- Commit changes if all table drops were successful
  COMMIT;
END;
$$ LANGUAGE plpgsql;

-- Example usage: Drop tables 'table1', 'table2', and 'table3' with all-or-nothing rollback
SELECT drop_tables_all_or_nothing(ARRAY['table1', 'table2', 'table3']);

