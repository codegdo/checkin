-- CREATE FUNCTION USER_GET
CREATE OR REPLACE FUNCTION dbo.fn_module_get(p_type varchar)
RETURNS TABLE (

)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        m.name as "module",
        m2.name as "mgroup",
        v.name as "view",
        v.view_group as "vgroup",
        v.type as "type",
        o.name as "object"
      FROM dbo.module m
      JOIN dbo.module m2 on m2.id = m.parent_id
      LEFT JOIN dbo.module_view mv on m.id = mv.module_id
      RIGHT JOIN (
        SELECT

        v.id as id,
        v.name as name,
        v.type as type,
        v2.name as view_group,
        v.sort_order as sort_order,
        v.is_external as is_external,
        v.is_internal as is_internal,
        v.is_active as is_active

        FROM dbo.view v
        JOIN dbo.view v2 on v2.id = v.parent_id
        WHERE EXISTS(
          SELECT * FROM dbo.view
          WHERE parent_id IS NOT NULL AND is_active = true
        )
      ) v on mv.view_id = v.id
      LEFT JOIN dbo.view_object vo on v.id = vo.view_id
      LEFT JOIN (
          SELECT * FROM dbo.object
      ) o on vo.object_id = o.id
      WHERE EXISTS (
        SELECT * FROM dbo.module
        WHERE parent_id IS NOT NULL AND is_active = true
      ) AND m.is_internal = true AND v.is_internal = true
      ORDER BY m.sort_order, v.sort_order ASC;
  END;
$BODY$
LANGUAGE plpgsql;