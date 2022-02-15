-- CREATE FUNCTION USER_GET
CREATE OR REPLACE FUNCTION sec.fn_user_get_by_username(p_username varchar)
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
  "roleLevel" int,
  "roleType" varchar,
  "isOwner" boolean 
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
        r.role_level,
        rt.name,
        r.is_owner
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN dbo.role_type rt ON rt.id = r.role_type_id
      WHERE u.username = p_username;
  END;
$BODY$
LANGUAGE plpgsql;