-- CREATE PROCEDURE USER_LOGIN
CREATE OR REPLACE PROCEDURE sec.pr_user_login(
  p_username varchar,
  OUT "user" json,
  OUT "stores" json,
  OUT "business" json,
  OUT "modules" json,
  OUT "permissions" json,
  OUT "policy" json
)
AS
$BODY$
  DECLARE
      user_biz_id int;
      user_group_type varchar;
      user_group_id int;
  BEGIN

    SELECT json_agg(u.*)::json ->> 0
    INTO "user"
    FROM (
      SELECT * FROM sec.fn_user_get_by_id(p_username)
    ) u;

    IF "user" IS NOT NULL THEN

      --SET
      SELECT "user" ->> 'bizId' INTO user_biz_id;
      SELECT "user" ->> 'groupType' INTO user_group_type;
      SELECT "user" ->> 'groupId' INTO user_group_id;

      IF user_group_type = 'system' THEN

      ELSE
        IF user_biz_id IS NOT NULL THEN
          --CHECK biz is_active
          IF(SELECT 1 FROM org.business WHERE id = user_biz_id AND is_active is TRUE) THEN

            SELECT json_agg(s)::json
            INTO "stores"
            FROM (
              SELECT id, name
              FROM org.store
              WHERE biz_id = user_biz_id
              AND is_active = true
            ) s;

            SELECT json_agg(m.*)::json
            INTO "modules"
            FROM (
              SELECT * FROM dbo.fn_module_get_by_group_type(user_group_type)
            ) m;

            SELECT json_agg(p.*)::json
            INTO "permissions"
            FROM (
              SELECT * FROM sec.fn_permission_get_access_level()
            ) p;

            SELECT json_agg(p.*)::json ->> 0
            INTO "policy"
            FROM (
              SELECT * FROM sec.fn_policy_get_by_group_id(user_group_id)
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