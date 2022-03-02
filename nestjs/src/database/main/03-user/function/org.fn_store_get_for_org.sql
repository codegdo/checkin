-- CREATE FUNCTION STORE_GET_FOR_ORG
CREATE OR REPLACE FUNCTION sec.fn_store_get_org(p_org_id varchar)
RETURNS TABLE org.store
AS
$BODY$
  BEGIN
    RETURN QUERY
      SELECT *
      FROM org.store
      WHERE id = p_org_id;
  END;
$BODY$
LANGUAGE plpgsql;