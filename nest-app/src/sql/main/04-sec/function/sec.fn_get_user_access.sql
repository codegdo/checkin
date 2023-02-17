CREATE FUNCTION main_sec.fn_get_user_access(p_user_id varchar)
RETURNS TABLE(
  "user" json,
  "navigation" json
) as $$
DECLARE
  user_data json;
BEGIN
  SELECT json_agg(u)::json ->> 0
  INTO user_data
  FROM (
    SELECT
      id,
      username,
      first_name "firstName",
      last_name "lastName",
      email_address "emailAddress",
      phone_number "phoneNumber",
      access_level "accessLevel",
      group_level "groupLevel",
      account_id "accountId",
      is_owner "isOwner",
      is_active "isActive"
    FROM main_sec.fn_get_user(p_user_id)
  ) u;

  if user_data is not null then
    RETURN QUERY
    SELECT user_data,
    (
      SELECT json_agg(m)::json
      FROM (select * from main_dbo.fn_get_module_object(user_data::json ->> 'accessLevel')) m
    );
  else
    raise exception no_data_found;
  end if;
END;
$$ language plpgsql;

SELECT * FROM main_sec.fn_get_user_access('2');