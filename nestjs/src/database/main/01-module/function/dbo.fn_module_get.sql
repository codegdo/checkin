-- CREATE FUNCTION MODULE_GET_BY_TYPE
CREATE OR REPLACE FUNCTION dbo.fn_module_get(p_type varchar)
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

      IF p_type = 'internal' THEN
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
      END IF;

      IF p_type = 'external' THEN
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
        WHERE m.is_external IS TRUE AND v.is_external IS TRUE
        ORDER BY m.sort_order, v.sort_order;
      END IF;

      IF p_type = 'system' THEN
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
        --WHERE m.is_internal IS TRUE AND v.is_internal IS TRUE
        ORDER BY m.sort_order, v.sort_order;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM dbo.fn_module_get('');

DROP FUNCTION IF EXISTS dbo.fn_module_get;