-- CREATE FUNCTION GET PERMISSION
CREATE OR REPLACE FUNCTION sec.fn_get_permission()
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

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS sec.fn_get_permission;
*/
