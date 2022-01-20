-- CREATE FUNCTION FN_PERMISSION_GET_LEVEL
CREATE OR REPLACE FUNCTION fn_permission_get_level()
RETURNS TABLE (
    "type" sec.permission_type_enum,
    "access" text
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


-- CALL FUNCTIONS

SELECT * FROM sec.fn_permission_get_level();

-- END

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
sec.fn_permission_get_level;

-- END