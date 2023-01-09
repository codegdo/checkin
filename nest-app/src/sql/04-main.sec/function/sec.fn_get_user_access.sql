CREATE FUNCTION "main.sec".fn_get_user_access(p_user_id varchar)
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
      role_level "roleLevel",
      company_id "companyId",
      is_owner "isOwner",
      is_active "isActive"
    FROM "main.sec".fn_get_user(p_user_id)
  ) u;

  if user_data is not null then
    RETURN QUERY
    SELECT user_data,
    (
      SELECT json_agg(m)::json
      FROM (select * from "main.dbo".fn_get_module(user_data::json ->> 'accessLevel')) m
    );
  else
    raise exception no_data_found;
  end if;
END;
$$ language plpgsql;

SELECT * FROM "main.sec".fn_get_user_access('2');