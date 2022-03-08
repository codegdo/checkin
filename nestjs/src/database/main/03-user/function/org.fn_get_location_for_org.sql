-- CREATE FUNCTION GET LOCATION FOR ORG
CREATE OR REPLACE FUNCTION org.fn_get_location_for_org(p_org_id int)
RETURNS TABLE(
  id int,
  name varchar
) AS
$BODY$
  DECLARE
  BEGIN
    RETURN QUERY
    SELECT l.id, l.name
    FROM org.location l
    WHERE l.org_id = p_org_id;
  END;
$BODY$
LANGUAGE plpgsql;