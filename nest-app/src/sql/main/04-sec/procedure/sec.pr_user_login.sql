-- USER_LOGIN
CREATE PROCEDURE main_sec.pr_user_login(
  p_user_id varchar,
  OUT data json
) as $$
DECLARE
  user_data json;
BEGIN
  SELECT json_agg(d)::json ->> 0
  INTO data
  FROM (select * from main_sec.fn_get_user_access(p_user_id)) d;

END;
$$ language plpgsql;

CALL main_sec.pr_user_login('2', null);