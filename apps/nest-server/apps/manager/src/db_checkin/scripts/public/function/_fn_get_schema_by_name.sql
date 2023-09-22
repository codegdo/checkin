CREATE OR REPLACE FUNCTION _get_schema_by_name(schemaName text)
RETURNS text AS $$
BEGIN
  RETURN (
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name = schemaName
  );
END;
$$ LANGUAGE plpgsql;