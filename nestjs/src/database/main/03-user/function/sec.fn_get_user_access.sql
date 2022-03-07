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