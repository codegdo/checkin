-- CREATE PROCEDURE USER_SAVE
CREATE OR REPLACE PROCEDURE sec.pr_user_save(
  p_form_data json,
  p_form_id int,
  p_user_id int,
  p_login_id int,

  OUT data jsonb
)
AS
$BODY$
  DECLARE
    login_username varchar;
    login_org_id int;
  BEGIN
    --TEMP
    DROP TABLE IF EXISTS PUSV_eval CASCADE;
    CREATE TEMP TABLE PUSV_eval AS
    SELECT * FROM org.fn_get_eval(p_form_data);

    --SET vars
    SELECT u.username, u.org_id
    INTO login_username, login_org_id
    FROM sec.user u
    WHERE u.id = p_login_id;

    --CHECK login exists
    IF login_username IS NOT NULL THEN

      --CHECK
      IF p_user_id = 0 THEN

        --INSERT
        WITH c AS (
          INSERT INTO org.contact(
            first_name,
            last_name,
            email_address,
            phone_number
          )
          VALUES(
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.first_name'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.last_name'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.email_address'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.phone_number')
          )
          RETURNING id, email_address, phone_number
        ), u AS (
          INSERT INTO sec.user(
            username,
            password,
            passcode,
            contact_id,
            group_id,
            form_id,
            org_id,
            is_new_password,
            is_active,
            created_by
          )
          VALUES(
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.username'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.password'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.passcode'),
            (SELECT id FROM c),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.group_id')::int,
            (p_form_id),
            (org_id),
            (true),
            (true),
            (login_username)
          )
          RETURNING id, username, is_active, contact_id
        ), ul AS (
          INSERT INTO sec.user_location(user_id, location_id)
          VALUES(
            (SELECT id FROM u),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user_location.location_id')::int
          )
        )
        SELECT id
        INTO data
        FROM u;

      ELSE

        SELECT json_agg(u)::json ->> 0
        INTO data
        FROM (
          SELECT id, contact_id
          FROM sec.user
          WHERE id = p_user_id AND org_id = login_org_id
        ) u;

        --SELECT json_build_object('id', u.id, 'contact_id', u.contact_id)
        --INTO data
        --FROM sec.user u
        --WHERE u.id = p_user_id;

        IF data IS NOT NULL THEN
            --UPDATE
            UPDATE sec.user u
            SET
              --username = (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.username')
              passcode = (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.passcode')
            WHERE u.id = p_user_id;

            UPDATE org.contact c
            SET
              first_name = (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.first_name'),
              last_name = (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.last_name')
            WHERE c.id = (data ->> 'contact_id')::int;
        END IF;

      END IF;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE  IF EXISTS sec.pr_user_save(json, int, int, int, jsonb);

CALL sec.pr_user_save(
 '[{"key":"1","value":"lamdo1"},{"key":"2","value":"ac3510cdbda7ae639b95e3f294605fdea44b4d1a67ff4e257d2a0c1100fd35cc.e9b4c2d5a8e974fc"},{"key":"3","value":"1235"},{"key":"4","value":"1"},{"key":"5","value":"6"},{"key":"6","value":"lam"},{"key":"7","value":"do"},{"key":"8","value":"lamdo@gmail.com"},{"key":"9","value":"8583571474"}]',
 3, 0, 1, null
);

