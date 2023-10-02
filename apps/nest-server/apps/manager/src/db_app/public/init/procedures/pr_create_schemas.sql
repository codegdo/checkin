CREATE OR REPLACE PROCEDURE pr_create_schemas(
  schemaNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schemaNames
  LOOP
    EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || schema_name;

    IF NOT FOUND THEN
      RAISE NOTICE 'Error create schema %', schema_name;
    END IF;
  END LOOP;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

REVOKE EXECUTE ON PROCEDURE pr_create_schemas(text[]) FROM public;