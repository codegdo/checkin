-- CREATE PROCEDURE USER_LOGIN
CREATE OR REPLACE PROCEDURE sec.pr_user_login(
  p_username varchar,
  OUT "user" json,
  OUT "locations" json
)
AS
$BODY$
  DECLARE
      user_org_id int;
  BEGIN

    SELECT json_agg(u.fn_user_get)::json ->> 0
    INTO "user"
    FROM (
      SELECT sec.fn_user_get(p_username)
    ) u;
    
    IF "user" IS NOT NULL THEN
      
      --SET user_org_id
      SELECT "user" ->> 'orgId' INTO user_org_id;

      SELECT json_agg(l)::json
      INTO "locations"
      FROM (
        SELECT id, name
        FROM org.location
        WHERE org_id = user_org_id
        AND is_active IS NOT NULL
      ) l;
    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;
    
    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_login('gdo0', null, null);

DROP PROCEDURE IF EXISTS sec.pr_user_login(varchar, json, json);