CREATE OR REPLACE FUNCTION _fn_drop_tables(table_names TEXT[])
RETURNS void AS $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY table_names
  LOOP
    EXECUTE 'DROP TABLE IF EXISTS ' || table_name;

    IF NOT FOUND THEN
      RAISE NOTICE 'Error dropping table %', table_name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
