-- CREATE FUNCTION USER_GET
CREATE OR REPLACE FUNCTION sec.fn_get_user(p_user_id varchar)
RETURNS TABLE (
  "id" int,
  "username" varchar,
  "password" varchar,
  "orgId" int,
  "isActive" boolean,

  "firstName" varchar,
  "lastName" varchar,
  "emailAddress" varchar,
  "phoneNumber" varchar,

  "groupId" int,
  "groupLevel" int,
  "groupType" varchar,
  "isOwner" boolean
)
AS
$BODY$
  DECLARE
    filter_id int := 0;
    filter_username varchar := '';
  BEGIN

    IF (SELECT p_user_id ~ '^\d+$') THEN
      filter_id := p_user_id::int;
    ELSE
      filter_username := p_user_id::varchar;
    END IF;

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
        gt.name,
        g.is_owner
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      LEFT JOIN sec.group g ON g.id = u.group_id
      LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
      WHERE u.id = filter_id OR u.username = filter_username;
  END;
$BODY$
LANGUAGE plpgsql;