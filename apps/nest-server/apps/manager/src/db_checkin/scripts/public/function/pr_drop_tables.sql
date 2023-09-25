CREATE OR REPLACE PROCEDURE pr_drop_tables(
  table_names TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY table_names
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping tables.
    BEGIN
      EXECUTE 'DROP TABLE IF EXISTS ' || table_name;
      RAISE NOTICE 'Dropped table: %', table_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping table %: %', table_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
