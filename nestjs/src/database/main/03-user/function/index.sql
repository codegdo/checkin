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
  "user" json,
  locations json,
  organizations json,
  modules json,
  permissions json,
  policies json
) AS
$BODY$
  DECLARE
    _user json;
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
    SELECT json_agg(_u)::json ->> 0
    INTO _user
    FROM (
      SELECT
        u.id "id",
        u.username "username",
        u.password "password",
        u.org_id "orgId",
        u.is_active "isActive",
        u.first_name "firstName",
        u.last_name "lastName",
        u.email_address "emailAddress",
        u.phone_number "phoneNumber",
        u.group_id "groupId",
        u.group_level "groupLevel",
        u.group_type "groupType",
        u.is_owner "isOwner"
      FROM sec.fn_get_user(p_user_id::varchar) u
    ) _u;

    IF _user IS NOT NULL THEN
      --SET
      SELECT (SELECT _user)::jsonb ->> 'orgId' INTO org_id;
      SELECT (SELECT _user)::jsonb ->> 'groupId' INTO group_id;
      SELECT (SELECT _user)::jsonb ->> 'groupType' INTO group_type;
      SELECT (SELECT _user)::jsonb ->> 'isOwner' INTO is_owner;

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
        SELECT * FROM dbo.fn_get_module(p_user_id)
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
      _user,
      _locations,
      _organizations,
      _modules,
      _permissions,
      _policies;
  END;
$BODY$
LANGUAGE plpgsql;

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

-- CREATE FUNCTION GET_USER_FOR_ORG
CREATE OR REPLACE FUNCTION sec.fn_get_user_for_org(
  p_org_id int,
  p_location_id int,
  p_query json
)
RETURNS TABLE (
  id int,
  username varchar,
  is_active boolean,

  first_name varchar,
  last_name varchar,
  email_address varchar,
  phone_number varchar,

  --location text,

  group_level int,
  group_name varchar,
  group_type varchar,
  is_owner boolean
)
AS
$BODY$
  DECLARE
    _username varchar = p_query ->> 'username';
    _first_name varchar = p_query ->> 'firstName';
    _last_name varchar = p_query ->> 'lastName';
    _email_address varchar = p_query ->> 'emailAddress';
    _phone_number varchar = p_query ->> 'phoneNumber';
    --_location varchar = p_query ->> 'location';
    _group varchar = p_query ->> 'group';
    _type varchar = p_query ->> 'type';

    _sort_column varchar = p_query ->> 'sortColumn';
    _sort_direction varchar = p_query ->> 'sortDirection';
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

      --string_agg(l.name, ', ') location_name,

      g.group_level,
      g.name,
      gt.name,
      g.is_owner
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    LEFT JOIN sec.group g ON g.id = u.group_id
    LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
    LEFT JOIN sec.user_location ul ON ul.user_id = u.id
    LEFT JOIN org.location l ON l.id = ul.location_id
    WHERE u.org_id = p_org_id AND l.id = p_location_id
      CASE WHEN _username IS NULL
        AND _first_name IS NULL
        AND _last_name IS NULL
        AND _email_address IS NULL
        AND _phone_number IS NULL
        --AND _location IS NULL
        AND _group IS NULL
        AND _type IS NULL THEN true
      ELSE u.username LIKE '%' || _username || '%'
        OR c.first_name LIKE '%' || _first_name || '%'
        OR c.last_name LIKE '%' || _last_name || '%'
        OR c.email_address LIKE '%' || _email_address || '%'
        OR c.phone_number LIKE '%' || _phone_number || '%'
        --OR l.name LIKE '%' || _location || '%'
        OR g.name LIKE '%' || _group || '%'
        OR gt.name LIKE '%' || _type || '%'
      END
    --GROUP BY u.id, u.username, c.first_name, c.last_name, c.email_address, c.phone_number, l.name, g.group_level, g.name, gt.name, g.is_owner, u.is_active
    ORDER BY
      CASE WHEN _sort_column = '' AND _sort_direction = '' THEN u.id END DESC,
      CASE WHEN _sort_column = 'id' AND _sort_direction = 'asc' THEN u.id END ASC,
      CASE WHEN _sort_column = 'id' AND _sort_direction = 'desc' THEN u.id END DESC,
      CASE WHEN _sort_column = 'username' AND _sort_direction = 'asc' THEN u.username END ASC,
      CASE WHEN _sort_column = 'username' AND _sort_direction = 'desc' THEN u.username END DESC,
      CASE WHEN _sort_column = 'firstName' AND _sort_direction = 'asc' THEN c.first_name END ASC,
      CASE WHEN _sort_column = 'firstName' AND _sort_direction = 'desc' THEN c.first_name END DESC,
      CASE WHEN _sort_column = 'lastName' AND _sort_direction = 'asc' THEN c.last_name END ASC,
      CASE WHEN _sort_column = 'lastName' AND _sort_direction = 'desc' THEN c.last_name END DESC,
      CASE WHEN _sort_column = 'emailAddress' AND _sort_direction = 'asc' THEN c.email_address END ASC,
      CASE WHEN _sort_column = 'emailAddress' AND _sort_direction = 'desc' THEN c.email_address END DESC,
      CASE WHEN _sort_column = 'phoneNumber' AND _sort_direction = 'asc' THEN c.phone_number END ASC,
      CASE WHEN _sort_column = 'phoneNumber' AND _sort_direction = 'desc' THEN c.phone_number END DESC,
      --CASE WHEN _sort_column = 'location' AND _sort_direction = 'asc' THEN l.name END ASC,
      --CASE WHEN _sort_column = 'location' AND _sort_direction = 'desc' THEN l.name END DESC,
      CASE WHEN _sort_column = 'level' AND _sort_direction = 'asc' THEN g.group_level END ASC,
      CASE WHEN _sort_column = 'level' AND _sort_direction = 'desc' THEN g.group_level END DESC,
      CASE WHEN _sort_column = 'group' AND _sort_direction = 'asc' THEN g.name END ASC,
      CASE WHEN _sort_column = 'group' AND _sort_direction = 'desc' THEN g.name END DESC,
      CASE WHEN _sort_column = 'type' AND _sort_direction = 'asc' THEN gt.name END ASC,
      CASE WHEN _sort_column = 'type' AND _sort_direction = 'desc' THEN gt.name END DESC;

  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION SET ORG DEFAULT
CREATE OR REPLACE FUNCTION sec.fn_set_org_default(
  p_org_id int,
  p_login_id int
)
RETURNS void AS
$BODY$
  DECLARE
    business_type varchar;
    login_username varchar;

    _groups json;
  BEGIN
    --SET business_type
    SELECT bt.category
    INTO business_type
    FROM sec.organization o
    LEFT JOIN dbo.business_type bt ON o.business_type_id = bt.id
    WHERE o.id = p_org_id;

    --SET username
    SELECT username
    INTO login_username
    FROM sec.user
    WHERE id = p_login_id;

    IF business_type = 'Service' THEN

      WITH g AS (
        INSERT
        INTO sec.group(name, group_type_id, org_id, created_by)
        VALUES
        ('Manager', '2', p_org_id, login_username),
        ('Employee', '3', p_org_id, login_username)
        RETURNING id, group_type_id, org_id
      ), p AS (
        INSERT
        INTO sec.policy(name, version_id, group_type_id, org_id, created_by)
        VALUES
        ('Manager Access', '1', '2', p_org_id, login_username),
        ('Employee Access', '1', '3', p_org_id, login_username)
        RETURNING id, group_type_id, org_id
      ), gp AS (
        INSERT
        INTO sec.group_policy(group_id, policy_id)
        VALUES
        (
          (SELECT id FROM g  WHERE group_type_id = 2 AND org_id = p_org_id),
          (SELECT id FROM p WHERE group_type_id = 2 AND org_id = p_org_id)
        ),
        (
          (SELECT id FROM g WHERE group_type_id = 3 AND org_id = p_org_id),
          (SELECT id FROM p WHERE group_type_id = 3 AND org_id = p_org_id)
        )
      )
      SELECT json_agg(g.id)::json
      INTO _groups
      FROM g WHERE org_id = p_org_id;

    END IF;

    RAISE NOTICE 'Groups ids has inserted %', _groups;
    --RETURN QUERY
    --SELECT _groups;
  END;
$BODY$
LANGUAGE plpgsql;

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS sec.fn_get_location_for_org;
DROP FUNCTION IF EXISTS sec.fn_get_location_for_user;
DROP FUNCTION IF EXISTS sec.fn_get_policy;
DROP FUNCTION IF EXISTS sec.fn_get_user_access;
DROP FUNCTION IF EXISTS sec.fn_get_user_for_org;
DROP FUNCTION IF EXISTS sec.fn_get_user;
DROP FUNCTION IF EXISTS sec.fn_set_org_default;
*/