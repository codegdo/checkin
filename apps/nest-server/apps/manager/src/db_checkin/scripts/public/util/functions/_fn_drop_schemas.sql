CREATE OR REPLACE FUNCTION _fn_drop_schemas(
  schema_names TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schema_names
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping schemas.
    BEGIN
      EXECUTE 'DROP SCHEMA IF EXISTS ' || schema_name;
      RAISE NOTICE 'Dropped schema: %', schema_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping schema %: %', schema_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;