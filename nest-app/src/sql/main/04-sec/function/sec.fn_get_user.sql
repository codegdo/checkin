CREATE FUNCTION main_sec.fn_get_user (p_user_id VARCHAR)
RETURNS TABLE (
  id INT,
  username VARCHAR,
  account_id INT,
  is_active BOOLEAN,
  group_name VARCHAR,
  is_owner BOOLEAN,
  group_level INT,
  access_level VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  email_address VARCHAR,
  phone_number VARCHAR
) AS $$
DECLARE
  --
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.username,
    u.account_id,
    u.is_active,
    g.name AS "group_name",
    g.is_owner,
    g.group_level,
    al.name AS "access_level",
    c.first_name,
    c.last_name,
    c.email_address,
    c.phone_number
  FROM main_sec.user u
  JOIN main_sec.group g ON g.id = u.group_id
  JOIN main_sec.access_level al ON al.id = g.access_level_id
  JOIN main_org.contact c ON c.id = u.contact_id
  WHERE (
    CASE
      WHEN (p_user_id ~ '^\d+$') THEN
        u.id = CAST(p_user_id AS INT)
      ELSE
        u.username = p_user_id
    END
  );
END;
$$ LANGUAGE plpgsql;

SELECT * FROM main_sec.fn_get_user('2');


select
       t.row_num,
       id,
       COALESCE((t.data ->> t.row_num::int - 1)::jsonb ->> 'day_of_week') day_of_week
from (
    select
        row_number() OVER () as row_num,
       bh.id,
       bh.day_of_week,
       bs.data
        from main_dbo.business_hour bh
            join main_dbo.booking_schedule bs on bh.workspace_id = bs.workspace_id
        where bh.workspace_id = 2
) as t;