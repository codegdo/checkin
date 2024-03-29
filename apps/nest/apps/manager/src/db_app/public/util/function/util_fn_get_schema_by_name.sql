CREATE OR REPLACE FUNCTION util_fn_get_schema_by_name(schemaName text)
RETURNS text AS $$
BEGIN
  RETURN (
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name = schemaName
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION util_fn_get_schema_by_name(text) FROM public;