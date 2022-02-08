-- CREATE FUNCTION USER_GET
CREATE OR REPLACE FUNCTION sec.fn_user_get(p_username varchar)
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
  
  "roleId" int,
  "isOwner" boolean,
  "roleType" varchar
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

        r.id,
        r.is_owner,
        rt.name
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN dbo.role_type rt ON rt.id = r.role_type_id
      WHERE u.username = p_username;
  END;
$BODY$
LANGUAGE plpgsql;