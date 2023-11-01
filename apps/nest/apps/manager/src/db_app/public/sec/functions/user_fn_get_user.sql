CREATE FUNCTION user_fn_get_user(userId TEXT)
RETURNS TABLE (
  id INT,
  username VARCHAR,
  company_id INT,
  is_active BOOLEAN,
  group_name VARCHAR,
  is_owner BOOLEAN,
  group_level INT,
  access_level VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  email_address VARCHAR,
  phone_number VARCHAR
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.username,
    u.first_name,
    u.last_name,
    u.email_address,
    u.phone_number,
    u.company_id,
    u.is_active,
    r.name AS "role_name",
    r.is_owner,
    r.role_level,
    rt.name AS "role_type"
    
  FROM
    user u
    JOIN role r ON r.id = u.role_id
    JOIN role_type rt ON rt.id = r.role_type_id
  WHERE
  (
    CASE
      WHEN (userId ~ '^\d+$') THEN
        u.id = CAST(userId AS INT)
      ELSE
        u.username = p_user_id
    END
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION user_fn_get_user(TEXT) FROM public;

