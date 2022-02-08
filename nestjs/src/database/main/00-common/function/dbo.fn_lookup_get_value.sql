-- CREATE FUNCTION LOOKUP_GET_VALUE
CREATE OR REPLACE FUNCTION dbo.fn_lookup_get_value(
  IN p_lookup text,
  OUT data jsonb
)
RETURNS jsonb
AS
$fn$
  DECLARE
    lookup_schema text := split_part(p_lookup, '.', 1);
    lookup_table text := split_part(p_lookup, '.', 2);
    lookup_column text := split_part(p_lookup, '.', 3);
    lookup_column_id text := split_part(p_lookup, '.', 4);
    string_sql text;
  BEGIN
    IF lookup_table = 'territory' THEN
      string_sql := FORMAT(
        $ex$
          SELECT json_agg(json_build_object('key', %4$s, 'value', %3$s))
          FROM (
            SELECT DISTINCT %3$s, %4$s
            FROM %1$s.%2$s
            ORDER BY %3$s
          ) t
        $ex$, lookup_schema, lookup_table, lookup_column, lookup_column_id
      );

      EXECUTE string_sql INTO data;
    END IF;
  END;
$fn$
LANGUAGE plpgsql;





$$
' SELECT json_agg(json_build_object(''key'', t.'|| _column_id ||',''value'', t.'|| _column ||')) '
' FROM ( '
  ' SELECT DISTINCT '|| _column ||', '|| _column_id ||' '
  ' FROM ' || _schema || '.' || _table ||' '
  ' ORDER BY ' || _column ||' '
' ) as t '
$$