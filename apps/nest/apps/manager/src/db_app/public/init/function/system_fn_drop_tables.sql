CREATE OR REPLACE FUNCTION system_fn_drop_tables(
  tableNames TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY tableNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP TABLE IF EXISTS ' || table_name;
      RAISE NOTICE 'Dropped table: %', table_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error dropping table %: %', table_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_drop_tables(text[]) FROM public;