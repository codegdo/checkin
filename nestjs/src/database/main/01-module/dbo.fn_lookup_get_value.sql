-- CREATE FUNCTION LOOKUP_GET_VALUE
CREATE OR REPLACE FUNCTION dbo.fn_lookup_get_value(
  p_lookup text,
  OUT out_data jsonb
)
RETURNS jsonb
AS
$fn$
  DECLARE
    _schema text := split_part(p_lookup, '.', 1);
    _table text := split_part(p_lookup, '.', 2);
    _column text := split_part(p_lookup, '.', 3);
    _column_id text := split_part(p_lookup, '.', 4);
    _sql text;
  BEGIN
    IF _table = 'territory' THEN
    _sql := FORMAT(
      $ex$
        SELECT json_agg(json_build_object('key', %4$s, 'value', %3$s))
        FROM (
          SELECT DISTINCT %3$s, %4$s
          FROM %1$s.%2$s
          ORDER BY %3$s
        ) t
      $ex$, _schema, _table, _column, _column_id
    );

    EXECUTE _sql INTO out_data;
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