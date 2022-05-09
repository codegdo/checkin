-- CREATE PROCEDURE USER_LOGIN
CREATE OR REPLACE PROCEDURE sec.pr_user_login(
  p_username varchar,

  OUT "user" json,
  OUT locations json,
  OUT organizations json,
  OUT modules json,
  OUT permissions json,
  OUT policies json
)
AS
$BODY$
  DECLARE
      user_id int;
      user_org_id int;
      user_is_active boolean;
      
      user_group_id int;
      user_group_type varchar;
  BEGIN

    SELECT id, org_id, group_type, is_active
    INTO user_id, user_org_id, user_group_type, user_is_active
    FROM sec.fn_get_user(p_username);

    IF user_id IS NOT NULL AND user_is_active IS TRUE THEN

      IF user_group_type = 'system' THEN
        SELECT
          ua.user,
          ua.locations,
          ua.organizations,
          ua.modules,
          ua.permissions,
          ua.policies
        INTO
          "user",
          locations,
          organizations,
          modules,
          permissions,
          policies
        FROM sec.fn_get_user_access(user_id) ua;
      ELSE
        
        IF user_org_id IS NOT NULL THEN
          SELECT
            ua.user,
            ua.locations,
            ua.organizations,
            ua.modules,
            ua.permissions,
            ua.policies
          INTO
            "user",
            locations,
            organizations,
            modules,
            permissions,
            policies
          FROM sec.fn_get_user_access(user_id) ua;
        ELSE
          RAISE EXCEPTION no_data_found;
        END IF;

      END IF;
    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_login('gdo', null, null, null, null, null, null);

DROP PROCEDURE IF EXISTS sec.pr_user_login(varchar, json, json, json, json, json, json);