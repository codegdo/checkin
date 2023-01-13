-- USER_PERMISSION_POLICY
CREATE PROCEDURE main_sec.pr_user_permission_policy(
  p_user_id varchar,
  OUT data json
) as $$
DECLARE
  policies json;
BEGIN
  SELECT json_agg(p)::json
  INTO policies
  FROM (select * from main_sec.fn_get_policy_for_user(p_user_id)) p;

  SELECT json_agg(output)::json ->> 0
  INTO data
  FROM (SELECT policies) output;

END;
$$ language plpgsql;