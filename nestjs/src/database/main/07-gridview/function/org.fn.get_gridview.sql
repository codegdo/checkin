-- CREATE FUNCTION FN_GET_FIELD
CREATE OR REPLACE FUNCTION org.fn_get_gridview()
RETURNS TABLE ()
AS
$BODY$
  RETURN QUERY

  SELECT
    gc.id,
    gc.name,
    COALESCE((gv.data ->> gc.name)::jsonb ->> 'label', gc.label) label,
    gc.type,
    COALESCE(((gv.data ->> gc.name)::jsonb ->> 'sortOrder')::int, gc.sort_order) sort_order,
    gc.data,
    gc.lookup,
    COALESCE(((gv.data ->> gc.name)::jsonb ->> 'isVisible')::boolean, gc.is_visible) is_visible,
    gc.is_config,
    gc.label_enable,
    gc.sort_order_enable,
    gc.is_visible_enable,
    gv.data config
  FROM dbo.gridview_type gt
  LEFT JOIN dbo.gridview_column gc ON gc.gridview_type_id = gt.id
  LEFT JOIN (
    SELECT *
    FROM org.gridview _gv
    WHERE _gv.org_id = 1 AND _gv.gridview_type_id = 1
  ) gv ON gv.gridview_type_id = gt.id
  WHERE gt.id = 1
  ORDER BY sort_order;
$BODY$
LANGUAGE plpgsql;

/*

select
  gc.id,
  gc.name,
  CASE
  WHEN gc.label = 'Active'
  THEN 'Active 1'
  ELSE gc.label
  END label,
  COALESCE((gv.data ->> gc.name)::jsonb ->> 'label', gc.label) label1,
  --gc.label,
  --gc.type,
  gc.sort_order,
  --gc.data,
  --gc.lookup,
  gc.is_visible,
  gv.data
  --gc.is_config,
  --gc.label_enable,
  --gc.sort_order_enable,
  --gc.is_visible_enable
  from dbo.gridview_type gt
  left join dbo.gridview_column gc ON gc.gridview_type_id = gt.id
  left join (
      select * from org.gridview g where  g.org_id = 0
  ) gv ON gc.gridview_type_id = gt.id;
*/