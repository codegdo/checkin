CREATE OR REPLACE FUNCTION fn_lookup_get_value(
  p_lookup text,
  OUT data jsonb
)
RETURNS jsonb
AS
$BODY$
  DECLARE
    _schema text := split_part(p_lookup, '.', 1);
    _table text := split_part(p_lookup, '.', 2);
    _column text := split_part(p_lookup, '.', 3);
    _column_id text := split_part(p_lookup, '.', 4);
    sql text;
  BEGIN

    sql := FORMAT(
      ' SELECT json_agg(json_build_object(''key'', t.'|| _column_id ||',''value'', t.'|| _column ||')) '
      ' FROM ( '
        ' SELECT DISTINCT '|| _column ||', '|| _column_id ||' '
        ' FROM ' || _schema || '.' || _table ||' '
        ' ORDER BY ' || _column ||' '
      ' ) as t '
    );

    EXECUTE sql INTO data;
  END;
$BODY$
LANGUAGE plpgsql;