-- CREATE FUNCTION STORE_GET_FOR_BIZ
CREATE OR REPLACE FUNCTION sec.fn_store_get_by_biz_id(p_biz_id varchar)
RETURNS TABLE org.store
AS
$BODY$
  BEGIN
    RETURN QUERY
      SELECT *
      FROM org.store
      WHERE id = p_biz_id;
  END;
$BODY$
LANGUAGE plpgsql;