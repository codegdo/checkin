CREATE FUNCTION dbo.fn_get_module()
RETURNS TABLE (
  module_name varchar,
  module_group varchar,
  view_name varchar,
  view_group varchar,
  object_name varchar
) as $$
BEGIN
  RETURN QUERY
  SELECT
    m.name,
    m2.name,
    v.name,
    v2.name,
    o.name
  FROM
    dbo.module m
    inner join dbo.module m2 on m2.id = m.parent_id
    join dbo.module_view mv on m.id = mv.module_id
    join dbo.view v on mv.view_id = v.id
    inner join dbo.view v2 on v2.id = v.parent_id
    join dbo.view_object vo on v.id = vo.view_id
    join dbo.object o on vo.object_id = o.id;
END;
$$ language plpgsql;

SELECT * FROM dbo.fn_get_module();