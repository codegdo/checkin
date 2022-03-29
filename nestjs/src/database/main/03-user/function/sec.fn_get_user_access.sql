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