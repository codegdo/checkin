CREATE FUNCTION main_sec.fn_get_policy_for_user(p_user_id varchar)
RETURNS TABLE(
  id int,
  name varchar,
  description varchar,
  data jsonb
) as $$
DECLARE
  --
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.description,
    p.data
  FROM main_sec.user u
  JOIN main_sec.group g on g.id = u.group_id
  INNER JOIN main_sec.group_policy gp on g.id = gp.group_id
  JOIN main_sec.policy p on p.id = gp.policy_id
  WHERE (
    case
      when (p_user_id ~ '^\d+$') then
        u.id = cast(p_user_id as int)
      else
        u.username = p_user_id
    end
  );
END;
$$ language plpgsql;

SELECT * FROM main_sec.fn_get_policy_for_user('2');