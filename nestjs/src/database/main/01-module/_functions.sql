-- CREATE FUNCTION MODULE_GET_BY_TYPE
CREATE OR REPLACE FUNCTION dbo.fn_module_get_by_type(p_type varchar)
RETURNS TABLE (
  module varchar,
  mname varchar,
  view varchar,
  vname varchar,
  object varchar
)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        m.name as module,
        m2.name,
        v.name as view,
        v2.name,
        o.name as object
      FROM dbo.module m
      JOIN dbo.module m2 on m2.id = m.parent_id
      LEFT JOIN dbo.module_view mv on m.id = mv.module_id
      LEFT JOIN dbo.view v on mv.view_id = v.id
      JOIN dbo.view v2 on v2.id = v.parent_id
      LEFT JOIN dbo.view_object vo on v.id = vo.view_id
      LEFT JOIN dbo.object o on vo.object_id = o.id
      WHERE m.is_internal IS TRUE AND v.is_internal IS TRUE
      ORDER BY m.sort_order, v.sort_order;
  END;
$BODY$
LANGUAGE plpgsql;

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

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
dbo.fn_module_get_by_type;

DROP FUNCTION IF EXISTS
dbo.fn_lookup_get_value;

-- END