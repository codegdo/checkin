-- CREATE FUNCTION GET LOCATION FOR ORG
CREATE OR REPLACE FUNCTION org.fn_get_location_for_org(p_org_id int)
RETURNS TABLE(
  id int,
  name varchar
) AS
$BODY$
  DECLARE
  BEGIN
    RETURN QUERY
    SELECT l.id, l.name
    FROM org.location l
    WHERE l.org_id = p_org_id;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION GET LOCATION FOR USER
CREATE OR REPLACE FUNCTION org.fn_get_location_for_user(p_user_id int)
RETURNS TABLE(
  id int,
  name varchar
) AS
$BODY$
  DECLARE
  BEGIN
    RETURN QUERY
    SELECT l.id, l.name
    FROM sec.user u
    INNER JOIN sec.user_location ul ON u.id = ul.user_id
    LEFT JOIN org.location l ON ul.location_id = l.id
    WHERE u.id = p_user_id;
  END;
$BODY$
LANGUAGE plpgsql;

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

-- CREATE FUNCTION GET POLICY
CREATE OR REPLACE FUNCTION sec.fn_get_policy(p_group_id int)
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

-- CREATE FUNCTION GET USER ACCESS
CREATE OR REPLACE FUNCTION sec.fn_get_user_access(p_user_id int)
RETURNS TABLE(
  users json,
  locations json,
  organizations json,
  modules json,
  permissions json,
  policies json
) AS
$BODY$
  DECLARE
    _users json;
    _locations json;
    _organizations json;
    _modules json;
    _permissions json;
    _policies json;

    org_id int;
    group_id int;
    group_type varchar;
    is_owner boolean := FALSE;

  BEGIN
    --GET
    SELECT json_agg(u)::json
    INTO _users
    FROM (
      SELECT *
      FROM sec.fn_get_user(p_user_id::varchar)
    ) u;

    IF _users IS NOT NULL THEN
      --SET
      SELECT (SELECT _users ->> 0)::jsonb ->> 'orgId' INTO org_id;
      SELECT (SELECT _users ->> 0)::jsonb ->> 'groupId' INTO group_id;
      SELECT (SELECT _users ->> 0)::jsonb ->> 'groupType' INTO group_type;
      SELECT (SELECT _users ->> 0)::jsonb ->> 'isOwner' INTO is_owner;

      IF group_type = 'internal' AND is_owner = TRUE THEN
        SELECT json_agg(l)::json
        INTO _locations
        FROM (
          SELECT *
          FROM org.fn_get_location_for_org(org_id)
        ) l;
      ELSE
        SELECT json_agg(l)::json
        INTO _locations
        FROM (
          SELECT *
          FROM org.fn_get_location_for_user(p_user_id)
        ) l;
      END IF;

      SELECT json_agg(o)::json
      INTO _organizations
      FROM (
        SELECT o.id, o.name
        FROM sec.organization o
        WHERE o.id = org_id
      ) o;

      SELECT json_agg(m)::json
      INTO _modules
      FROM (
        SELECT * FROM dbo.fn_get_module(group_type)
      ) m;

      SELECT json_agg(p)::json
      INTO _permissions
      FROM (
        SELECT * FROM sec.fn_get_permission()
      ) p;

      SELECT json_agg(p)::json
      INTO _policies
      FROM (
        SELECT * FROM sec.fn_get_policy(group_id)
      ) p;

    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    RETURN QUERY
      SELECT
      _users,
      _locations,
      _organizations,
      _modules,
      _permissions,
      _policies;
  END;
$BODY$
LANGUAGE plpgsql;

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS sec.fn_get_location_for_org;
DROP FUNCTION IF EXISTS sec.fn_get_location_for_user;
DROP FUNCTION IF EXISTS sec.fn_get_user;
DROP FUNCTION IF EXISTS sec.fn_get_user_access;
DROP FUNCTION IF EXISTS sec.fn_get_policy;
*/