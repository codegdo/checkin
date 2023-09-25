CREATE OR REPLACE FUNCTION _fn_drop_schemas(
  schema_names TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schema_names
  LOOP
    EXECUTE 'DROP SCHEMA IF EXISTS ' || quote_ident(schema_name);

    IF NOT FOUND THEN
      RAISE NOTICE 'Error dropping schema %', schema_name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;