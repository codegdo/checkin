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

-- CREATE FUNCTION POLICY_GET_BY_ROLE_ID
CREATE OR REPLACE FUNCTION sec.fn_policy_get_by_role_id(p_role_id int)
RETURNS TABLE (
  "statement" jsonb,
  "version" varchar
)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        p.statement,
        pv.name
      FROM sec.role r
      INNER JOIN sec.role_policy rp ON r.id = rp.role_id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.policy_version pv ON p.version_id = pv.id
      WHERE r.id = p_role_id;
  END;
$BODY$
LANGUAGE plpgsql;

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
sec.fn_user_get_by_username;

DROP FUNCTION IF EXISTS
sec.fn_policy_get_by_role_id;