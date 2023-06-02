CREATE FUNCTION main_sec.fn_get_user_access(p_user_id VARCHAR)
RETURNS TABLE(
  "user" JSON,
  "navigation" JSON
) AS $$
DECLARE
  user_data JSON;
BEGIN
  -- Retrieve user data using fn_get_user function and format it
  SELECT json_agg(u)::JSON ->> 0
  INTO user_data
  FROM (
    SELECT
      id,
      username,
      first_name AS "firstName",
      last_name AS "lastName",
      email_address AS "emailAddress",
      phone_number AS "phoneNumber",
      access_level AS "accessLevel",
      group_level AS "groupLevel",
      company_id AS "companyId",
      is_owner AS "isOwner",
      is_active AS "isActive"
    FROM main_sec.fn_get_user(p_user_id)
  ) u;

  -- If user data is not null, retrieve module objects and return user data and module objects
  IF user_data IS NOT NULL THEN
    RETURN QUERY
    SELECT user_data,
    (
      SELECT json_agg(m)::JSON
      FROM (SELECT * FROM main_dbo.fn_get_module_object(user_data::JSON ->> 'accessLevel')) m
    );
  -- Otherwise, throw an exception
  ELSE
    RAISE EXCEPTION no_data_found;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute function and retrieve results
SELECT * FROM main_sec.fn_get_user_access('2');
