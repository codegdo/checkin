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
    org_id int;
  BEGIN
    --TEMP
    DROP TABLE IF EXISTS PUSV_eval CASCADE;
    CREATE TEMP TABLE PUSV_eval AS
    SELECT * FROM org.fn_get_eval(p_form_data);

    --SET username
    SELECT u.username, u.org_id
    INTO login_username, org_id
    FROM sec.user u
    WHERE u.id = p_login_id;

    --CHECK user exists
    IF login_username IS NOT NULL THEN

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
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.username'),
          (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.password'),
          (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.passcode'),
          (SELECT id FROM c),
          (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.group_id'),

          (org_id),
          (login_username)
        )
        RETURNING id, username, is_active, contact_id
      ), ul AS (
        INSERT INTO sec.user_location(user_id, location_id)
        VALUES(
          (SELECT id FROM u),
          (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.location_id')
        )
      )
      SELECT id
      INTO data
      FROM u;

    END IF;
    
    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

