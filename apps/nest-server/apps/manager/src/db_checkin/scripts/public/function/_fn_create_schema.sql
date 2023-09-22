CREATE OR REPLACE FUNCTION _create_schema(schemaName text)
RETURNS void AS $$
BEGIN
    EXECUTE 'DROP SCHEMA IF EXISTS ' || quote_ident(schemaName) || ' CASCADE';
END;
$$ LANGUAGE plpgsql;