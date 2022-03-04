-- CREATE FUNCTION GET LOCATION FOR USER
CREATE OR REPLACE FUNCTION org.fn_get_location_for_user(p_user_id int)
RETURNS TABLE(
  id int,
  name varchar
) AS
$BODY$
  DECLARE
  BEGIN
    RETURN QUERY
    SELECT l.id, l.name
    FROM sec.user u
    INNER JOIN sec.user_location ul ON u.id = ul.user_id
    LEFT JOIN org.location l ON ul.location_id = l.id
    WHERE u.id = p_user_id;
  END;
$BODY$
LANGUAGE plpgsql;