-- CREATE FUNCTION FN_GET_GRIDVIEW
CREATE OR REPLACE FUNCTION org.fn_get_gridview(
  p_gridview_id varchar,
  p_org_id int
)
RETURNS TABLE (
  id int,
  name varchar,
  with_paging int
)
AS
$BODY$
  DECLARE
    _gridview_id int;
  BEGIN

    IF (p_gridview_id ~ '^\d+$') THEN
      _gridview_id := CAST(p_gridview_id as int);
    ELSE
      SELECT gv.id
      INTO _gridview_id
      FROM dbo.gridview gv 
      WHERE gv.name = p_gridview_id;
    END IF;
  
    RETURN QUERY

    SELECT
      gv.id,
      gv.name,
      COALESCE(gc.with_paging, gv.with_paging)::int with_paging
    FROM dbo.gridview gv
    LEFT JOIN (
      SELECT *
      FROM org.gridview_config gc
      WHERE gc.org_id = p_org_id AND gc.gridview_id = _gridview_id
    ) gc ON gc.gridview_id = gv.id
    WHERE gv.id = _gridview_id;
  END;
$BODY$
LANGUAGE plpgsql;

--SELECT * FROM org.fn_get_gridview('setup_users', 1);