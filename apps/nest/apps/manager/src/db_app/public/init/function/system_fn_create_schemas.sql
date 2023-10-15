CREATE OR REPLACE FUNCTION system_fn_create_schemas(
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
      EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || schema_name;
      RAISE NOTICE 'Created schema: %', schema_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error create schema %: %', schema_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_create_schemas(text[]) FROM public;