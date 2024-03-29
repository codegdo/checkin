create function main_dbo.fn_get_module_action(p_access_level varchar)
returns table (
  module varchar,
  view varchar,
  action varchar,
  action_group varchar
) as $$
declare
  access_level varchar = p_access_level;
begin
  return query
  select
    m.name,
    v.name,
    va.name,
    va.action_group
  from
    main_dbo.module m
    inner join main_dbo.module m2 on m2.id = m.parent_id
    join main_dbo.module_view mv on m.id = mv.module_id
    join main_dbo.view v on mv.view_id = v.id
    inner join main_dbo.view v2 on v2.id = v.parent_id
    join main_dbo.view_action va on v.id = va.view_id
  where (
    case
      when access_level = 'internal'
        then m.is_internal
          and m.is_active
          and v.is_internal
          and v.is_active
          and va.is_active
      when access_level = 'external'
        then m.is_external
          and m.is_active
          and v.is_external
          and v.is_active
          and va.is_active
      when access_level = 'system'
        then m.is_active
          and v.is_active
          and va.is_active
      else
        m.is_active is null
    end
  );
end;
$$ language plpgsql;

select * from main_dbo.fn_get_module_action('internal');
