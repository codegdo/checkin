CREATE FUNCTION main_dbo.fn_get_module_object(p_access_level varchar)
RETURNS TABLE (
  module varchar,
  module_group varchar,
  view varchar,
  view_group varchar,
  object varchar
) as $$
DECLARE
  access_level varchar = p_access_level;
BEGIN
  RETURN QUERY
  SELECT
    m.name,
    m2.name,
    v.name,
    v2.name,
    o.name
  FROM main_dbo.module m
    inner join main_dbo.module m2 on m2.id = m.parent_id
    join main_dbo.module_view mv on m.id = mv.module_id
    join main_dbo.view v on mv.view_id = v.id
    inner join main_dbo.view v2 on v2.id = v.parent_id
    join main_dbo.view_object vo on v.id = vo.view_id
    join main_dbo.object o on vo.object_id = o.id
  WHERE (
    case
      when access_level = 'internal'
        then m.is_internal
        and m.is_active
        and v.is_internal
        and v.is_active
        and o.is_active
      when access_level = 'external'
        then m.is_external
        and m.is_active
        and v.is_external
        and v.is_active
        and o.is_active
      when access_level = 'system'
        then m.is_active 
        and v.is_active
        and o.is_active
      else
        m.is_active is null
    end
  );
END;
$$ language plpgsql;

SELECT * FROM main_dbo.fn_get_module_object('external');