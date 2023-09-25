CREATE OR REPLACE FUNCTION _fn_create_schemas(
  schema_names TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schema_names
  LOOP
    EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || quote_ident(schema_name);

    IF NOT FOUND THEN
      RAISE NOTICE 'Error create schema %', schema_name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;