CREATE FUNCTION main_sec.fn_get_policy_for_user(p_user_id varchar)
RETURNS TABLE(
  id int,
  name varchar,
  description varchar,
  data jsonb
) AS $$
DECLARE
  -- No variables are declared
BEGIN
  -- Retrieve policy data for the given user ID or username
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.description,
    p.data
  FROM main_sec.user u
  JOIN main_sec.group g ON g.id = u.group_id
  INNER JOIN main_sec.group_policy gp ON g.id = gp.group_id
  JOIN main_sec.policy p ON p.id = gp.policy_id
  WHERE (
    CASE
      -- If p_user_id is a number, retrieve policies for the user with that ID
      WHEN (p_user_id ~ '^\d+$') THEN
        u.id = CAST(p_user_id AS int)
      -- Otherwise, retrieve policies for the user with that username
      ELSE
        u.username = p_user_id
    END
  );
END;
$$ LANGUAGE plpgsql;

-- Execute function and retrieve results
SELECT * FROM main_sec.fn_get_policy_for_user('2');
