-- CREATE FUNCTION MODULE_GET_BY_TYPE
CREATE OR REPLACE FUNCTION dbo.fn_module_get_by_type(p_type varchar)
RETURNS TABLE (
  module varchar,
  "moduleGroup" varchar,
  view varchar,
  "viewGroup" varchar,
  object varchar
)
AS
$BODY$
  BEGIN
    IF p_type = 'internal' THEN
      RETURN QUERY
      SELECT
        m1.name,
        m2.name,
        v1.name,
        v2.name,
        o.name object
      FROM dbo.module m1
      INNER JOIN dbo.module m2 on m2.id = m1.parent_id
      INNER JOIN dbo.module_view mv on m1.id = mv.module_id
      LEFT JOIN dbo.view v1 on mv.view_id = v1.id
      INNER JOIN dbo.view v2 on v2.id = v1.parent_id
      INNER JOIN dbo.view_object vo on v1.id = vo.view_id
      LEFT JOIN dbo.object o on vo.object_id = o.id
      WHERE m1.is_internal is TRUE AND v1.is_internal is TRUE
      ORDER BY m1.sort_order, v1.sort_order;
    END IF;

    IF p_type = 'external' THEN
      RETURN QUERY
      SELECT
        m1.name,
        m2.name,
        v1.name,
        v2.name,
        o.name object
      FROM dbo.module m1
      INNER JOIN dbo.module m2 on m2.id = m1.parent_id
      INNER JOIN dbo.module_view mv on m1.id = mv.module_id
      LEFT JOIN dbo.view v1 on mv.view_id = v1.id
      INNER JOIN dbo.view v2 on v2.id = v1.parent_id
      INNER JOIN dbo.view_object vo on v1.id = vo.view_id
      LEFT JOIN dbo.object o on vo.object_id = o.id
      WHERE m1.is_external is TRUE AND v1.is_external is TRUE
      ORDER BY m1.sort_order, v1.sort_order;
    END IF;

    IF p_type = 'system' THEN
      RETURN QUERY
      SELECT
        m1.name,
        m2.name,
        v1.name,
        v2.name,
        o.name object
      FROM dbo.module m1
      INNER JOIN dbo.module m2 on m2.id = m1.parent_id
      INNER JOIN dbo.module_view mv on m1.id = mv.module_id
      LEFT JOIN dbo.view v1 on mv.view_id = v1.id
      INNER JOIN dbo.view v2 on v2.id = v1.parent_id
      INNER JOIN dbo.view_object vo on v1.id = vo.view_id
      LEFT JOIN dbo.object o on vo.object_id = o.id
      --WHERE m1.is_internal is TRUE AND v1.is_internal is TRUE
      ORDER BY m1.sort_order, v1.sort_order;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM dbo.fn_module_get_by_type('');

DROP FUNCTION IF EXISTS dbo.fn_module_get_by_type;