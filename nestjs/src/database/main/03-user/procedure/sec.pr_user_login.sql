-- CREATE PROCEDURE USER_LOGIN
CREATE OR REPLACE PROCEDURE sec.pr_user_login(
  p_username varchar,
  OUT "user" json,
  OUT "locations" json,
  OUT "modules" json,
  OUT "permissions" json,
  OUT "policy" json
)
AS
$BODY$
  DECLARE
      user_org_id int;
      user_role_type varchar;
      user_role_id int;
  BEGIN

    SELECT json_agg(u.*)::json ->> 0
    INTO "user"
    FROM (
      SELECT * FROM sec.fn_user_get_by_username(p_username)
    ) u;

    IF "user" IS NOT NULL THEN

      --SET
      SELECT "user" ->> 'orgId' INTO user_org_id;
      SELECT "user" ->> 'roleType' INTO user_role_type;
      SELECT "user" ->> 'roleId' INTO user_role_id;

      IF user_role_type = 'system' THEN

      ELSE
        IF user_org_id IS NOT NULL THEN
          --CHECK org is_active
          IF(SELECT 1 FROM sec.organization WHERE id = user_org_id AND is_active is TRUE) THEN

            SELECT json_agg(l)::json
            INTO "locations"
            FROM (
              SELECT id, name
              FROM org.location
              WHERE org_id = user_org_id
              AND is_active = true
            ) l;

            SELECT json_agg(m.*)::json
            INTO "modules"
            FROM (
              SELECT * FROM dbo.fn_module_get_by_type(user_role_type)
            ) m;

            SELECT json_agg(p.*)::json
            INTO "permissions"
            FROM (
              SELECT * FROM sec.fn_permission_get_access_level()
            ) p;

            SELECT json_agg(p.*)::json ->> 0
            INTO "policy"
            FROM (
              SELECT * FROM sec.fn_policy_get_by_role_id(user_role_id)
            ) p;

          ELSE
            RAISE EXCEPTION no_data_found;
          END IF;
        END IF;
      END IF;
    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_login('gdo', null, null, null, null, null);

DROP PROCEDURE IF EXISTS sec.pr_user_login(varchar, json, json, json, json, json);