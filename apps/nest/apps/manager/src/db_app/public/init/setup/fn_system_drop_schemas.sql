CREATE OR REPLACE FUNCTION fn_system_drop_schemas(
  schemaNames TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schemaNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP SCHEMA IF EXISTS ' || schema_name;
      RAISE NOTICE 'Dropped schema: %', schema_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error dropping schema %: %', schema_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_system_drop_schemas(text[]) FROM public;