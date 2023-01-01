CREATE FUNCTION sec.fn_get_policy_for_user(p_user_id varchar)
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
  FROM sec.user u
  JOIN sec.group g on g.id = u.group_id
  INNER JOIN sec.group_policy gp on g.id = gp.group_id
  JOIN sec.policy p on p.id = gp.policy_id
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

SELECT * FROM sec.fn_get_policy_for_user('2');