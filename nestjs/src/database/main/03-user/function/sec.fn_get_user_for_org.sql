-- CREATE FUNCTION GET_USER_FOR_ORG
CREATE OR REPLACE FUNCTION sec.fn_get_user_for_org(p_org_id int)
RETURNS TABLE (
  id int,
  username varchar,
  is_active boolean,

  first_name varchar,
  last_name varchar,
  email_address varchar,
  phone_number varchar,

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
      u.is_active,

      c.first_name,
      c.last_name,
      c.email_address,
      c.phone_number,

      g.group_level,
      g.name,
      gt.name,
      g.is_owner
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    LEFT JOIN sec.group g ON g.id = u.group_id
    LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
    WHERE u.org_id = p_org_id;

  END;
$BODY$
LANGUAGE plpgsql;

--SELECT * FROM sec.fn_get_user_for_org(1)
