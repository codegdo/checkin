-- CREATE FUNCTION GET_USER
CREATE OR REPLACE FUNCTION sec.fn_get_user(p_user_id varchar)
RETURNS TABLE (
  id int,
  username varchar,
  password varchar,
  org_id int,
  is_active boolean,

  first_name varchar,
  last_name varchar,
  email_address varchar,
  phone_number varchar,

  group_id int,
  group_level int,
  group_name varchar,
  group_type varchar,
  is_owner boolean
)
AS
$BODY$
  DECLARE
    
  BEGIN

    RETURN QUERY
      SELECT
        u.id,
        u.username,
        u.password,
        u.org_id,
        u.is_active,

        c.first_name,
        c.last_name,
        c.email_address,
        c.phone_number,

        g.id,
        g.group_level,
        g.name,
        gt.name,
        g.is_owner
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      LEFT JOIN sec.group g ON g.id = u.group_id
      LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
      WHERE (
        CASE
          WHEN (p_user_id ~ '^\d+$') THEN
            u.id = CAST(p_user_id as int)
          ELSE
            u.username = p_user_id
        END
      );
  END;
$BODY$
LANGUAGE plpgsql;