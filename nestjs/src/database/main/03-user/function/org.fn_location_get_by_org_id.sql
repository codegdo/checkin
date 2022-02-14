-- CREATE FUNCTION LOCATION_GET_BY_ORG_ID
CREATE OR REPLACE FUNCTION sec.fn_location_get_by_org_id(p_org_id varchar)
RETURNS TABLE org.location
AS
$BODY$
  BEGIN
    RETURN QUERY
      SELECT *
      FROM org.location
      WHERE id = p_org_id;
  END;
$BODY$
LANGUAGE plpgsql;