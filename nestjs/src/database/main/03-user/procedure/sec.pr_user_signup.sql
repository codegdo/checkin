-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_form_data json,
  OUT data json
)
AS
$BODY$
  DECLARE
    user_group_id int := 2;
  BEGIN
    --TEMP
    DROP TABLE IF EXISTS PUSU_eval CASCADE;
    CREATE TEMP TABLE PUSU_eval AS
    SELECT * FROM org.fn_get_eval(p_form_data);
    
    --INSERT
      WITH c AS (
        INSERT INTO org.contact(
          first_name,
          last_name,
          email_address,
          phone_number
        )
        VALUES(
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'org.contact.first_name'),
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'org.contact.last_name'),
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'org.contact.email_address'),
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'org.contact.phone_number')
        )
        RETURNING id, email_address, phone_number
      ), u AS (
        INSERT INTO sec.user(
          username,
          password,
          contact_id,
          group_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'sec.user.username'),
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'sec.user.password'),
          (SELECT id FROM c),
          (user_group_id),
          (SELECT DISTINCT value FROM PUSU_eval WHERE map = 'sec.user.username')
        )
        RETURNING id, username, is_active, contact_id
      )
      SELECT json_agg(r)::json ->> 0
      INTO data
      FROM (
        SELECT
          u.id "id",
          u.username "username",
          u.is_active "isActive",
          c.phone_number "phoneNumber",
          c.email_address "emailAddress"
        FROM u LEFT JOIN c on c.id = u.contact_id
      ) r;
    
    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_signup('auth_signup', '[]', null);

DROP PROCEDURE IF EXISTS sec.pr_user_signup(varchar, json, json);