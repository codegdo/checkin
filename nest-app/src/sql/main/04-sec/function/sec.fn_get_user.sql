CREATE FUNCTION sec.fn_get_user(p_user_id varchar)
RETURNS TABLE(
  id int,
  username varchar,
  company_id int,
  is_active boolean,
  group_name varchar,
  is_owner boolean,
  role_level int,
  access_level varchar,
  first_name varchar,
  last_name varchar,
  email_address varchar,
  phone_number varchar
) as $$
DECLARE
  --
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.username,
    u.company_id,
    u.is_active,
    g.name as "group_name",
    g.is_owner,
    g.role_level,
    al.name as "access_level",
    c.first_name,
    c.last_name,
    c.email_address,
    c.phone_number
  FROM sec.user u
  JOIN sec.group g on g.id = u.group_id
  JOIN sec.access_level al on al.id = g.access_level_id
  JOIN org.contact c on c.id = u.contact_id
  WHERE (
    case
      when (p_user_id ~ '^\d+$') then
        u.id = cast(p_user_id as int)
      else
        u.username = p_user_id
    end;
  );
END;
$$ language plpgsql;

SELECT * FROM sec.fn_get_user('2');