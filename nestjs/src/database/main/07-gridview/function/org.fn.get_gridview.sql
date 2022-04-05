-- CREATE FUNCTION FN_GET_GRIDVIEW
CREATE OR REPLACE FUNCTION org.fn_get_gridview(
  p_gridview_id varchar,
  p_org_id int
)
RETURNS TABLE (
  id int,
  name varchar,
  label text,
  type varchar,
  sort_order int,
  data jsonb,
  lookup varchar,
  is_default boolean,
  is_search boolean,
  is_visible boolean,
  is_config boolean,
  label_enable boolean,
  sort_order_enable boolean,
  is_default_enable boolean,
  is_search_enable boolean,
  is_visible_enable boolean,
  config jsonb
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
      gc.id,
      gc.name,
      COALESCE((gcf.data ->> gc.name)::jsonb ->> 'label', gc.label) label,
      gc.type,
      COALESCE(((gcf.data ->> gc.name)::jsonb ->> 'sortOrder')::int, gc.sort_order) sort_order,
      gc.data,
      gc.lookup,
      COALESCE(((gcf.data ->> gc.name)::jsonb ->> 'isDefault')::boolean, gc.is_default) is_default,
      COALESCE(((gcf.data ->> gc.name)::jsonb ->> 'isSearch')::boolean, gc.is_search) is_search,
      COALESCE(((gcf.data ->> gc.name)::jsonb ->> 'isVisible')::boolean, gc.is_visible) is_visible,
      gc.is_config,
      gc.label_enable,
      gc.sort_order_enable,
      gc.is_visible_enable,
      gcf.data config
    FROM dbo.gridview gv
    LEFT JOIN dbo.gridview_column gc ON gc.gridview_id = gv.id
    LEFT JOIN (
      SELECT *
      FROM org.gridview_config gcf
      WHERE gcf.org_id = p_org_id AND gcf.gridview_id = _gridview_id
    ) gcf ON gcf.gridview_id = gv.id
    WHERE gv.id = _gridview_id
    ORDER BY sort_order;
  END;
$BODY$
LANGUAGE plpgsql;

