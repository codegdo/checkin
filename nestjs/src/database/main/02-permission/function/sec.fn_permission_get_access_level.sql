-- CREATE FUNCTION FN_PERMISSION_GET_ACCESS_LEVEL
CREATE OR REPLACE FUNCTION sec.fn_permission_get_access_level()
RETURNS TABLE (
  "type" varchar,
  "action" text
)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY

    SELECT p.type, string_agg(l.name, ',')
    FROM sec.permission p
    LEFT JOIN sec.permission_level pl ON p.id = pl.permission_id
    LEFT JOIN sec.level l ON l.id = pl.level_id
    GROUP BY p.type;

  END;
$BODY$
LANGUAGE plpgsql;
