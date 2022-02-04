-- CREATE FUNCTION USER_GET
CREATE OR REPLACE FUNCTION sec.fn_user_get(p_username varchar)
RETURNS TABLE (
  id int,
  "firstName" varchar,
  "lastName" varchar,
  "emailAddress" varchar,
  "phoneNumber" varchar,
  username varchar,
  password varchar,
  "roleId" int,
  "roleType" varchar,
  policy jsonb,
  "orgId" int,
  "orgActive" boolean,
  "isActive" boolean,
  "isOwner" boolean
)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        u.id,
        c.first_name,
        c.last_name,
        c.email_address,
        c.phone_number,
        u.username,
        u.password,
        r.id,
        rt.name,
        p.data,
        u.org_id,
        o.is_active,
        u.is_active,
        r.is_owner
      FROM sec.user u
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN sec.role_policy rp ON rp.role_id = r.id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.role_type rt ON rt.id = r.role_type_id
      LEFT JOIN sec.organization o ON o.id = u.org_id
      LEFT JOIN org.contact c ON c.id = u.contact_id
      WHERE u.username = p_username;
  END;
$BODY$
LANGUAGE plpgsql;