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

  "groupId" int,
  "groupLevel" int,
  "groupType" varchar,
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

        g.id,
        g.group_level,
        gt.name,
        g.is_owner
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      LEFT JOIN sec.group g ON g.id = u.group_id
      LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
      WHERE u.username = p_username;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION POLICY_GET_BY_GROUP_ID
CREATE OR REPLACE FUNCTION sec.fn_policy_get_by_group_id(p_group_id int)
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
      FROM sec.group g
      INNER JOIN sec.group_policy gp ON g.id = gp.group_id
      LEFT JOIN sec.policy p ON gp.policy_id = p.id
      LEFT JOIN dbo.policy_version pv ON p.version_id = pv.id
      WHERE g.id = p_group_id;
  END;
$BODY$
LANGUAGE plpgsql;

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
sec.fn_user_get_by_username;

DROP FUNCTION IF EXISTS
sec.fn_policy_get_by_group_id;