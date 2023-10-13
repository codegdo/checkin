CREATE OR REPLACE FUNCTION fn_get_table_by_name(tableName text)
RETURNS TABLE (
  schema_name text,
  table_name text,
  column_name text,
  data_type text
) AS $$
BEGIN
  RETURN QUERY (
    SELECT
      t.table_schema AS schema_name,
      t.table_name,
      c.column_name,
      c.data_type
    FROM
      information_schema.tables t
    JOIN
      information_schema.columns c
    ON
      t.table_name = c.table_name
      AND t.table_schema = c.table_schema
    WHERE
      t.table_name = tableName
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_table_by_name(text) FROM public;
