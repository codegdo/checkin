CREATE OR REPLACE FUNCTION _drop_schema(schemaName text)
RETURNS void AS $$
BEGIN
    EXECUTE 'CREATE SCHEMA ' || quote_ident(schemaName);
END;
$$ LANGUAGE plpgsql;