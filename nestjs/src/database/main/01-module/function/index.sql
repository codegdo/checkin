-- CREATE FUNCTION GET MODULE
CREATE OR REPLACE FUNCTION dbo.fn_get_module(p_login_id int)
RETURNS TABLE (
  module varchar,
  "moduleGroup" varchar,
  view varchar,
  "viewGroup" varchar,
  object varchar
)
AS
$BODY$
  DECLARE
    group_type varchar;
  BEGIN
    SELECT gt.name from sec.user u
    INTO group_type
    LEFT JOIN sec."group" g ON u.group_id = g.id
    LEFT JOIN dbo.group_type gt ON g.group_type_id = gt.id
    WHERE u.id = p_login_id AND u.is_active = true;
    
    IF group_type IS NOT NULL THEN
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
      WHERE (
        CASE
          WHEN group_type = 'internal' THEN
            m1.is_internal AND v1.is_internal
          WHEN group_type = 'external' THEN
            m1.is_external AND v1.is_external
          WHEN group_type = 'system' THEN
            m1.is_internal OR m1.is_internal = false
            AND 
            v1.is_internal OR v1.is_internal= false
          ELSE
            m1.is_active is NULL
        END
      )
      ORDER BY m1.sort_order, v1.sort_order;
    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS dbo.fn_get_module;
*/