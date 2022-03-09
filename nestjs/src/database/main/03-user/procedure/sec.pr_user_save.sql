-- CREATE PROCEDURE USER_SAVE
CREATE OR REPLACE PROCEDURE sec.pr_user_save(
  p_form_data json,
  p_login_id int,

  OUT data jsonb
)
AS
$BODY$
  DECLARE
    login_username varchar;
  BEGIN
    --TEMP
    DROP TABLE IF EXISTS SPUSV_eval CASCADE;
    CREATE TEMP TABLE SPUSV_eval AS
    SELECT * FROM org.fn_get_eval(p_form_data);

    --SET username
    SELECT username
    INTO login_username
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
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'org.contact.first_name'),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'org.contact.last_name'),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'org.contact.email_address'),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'org.contact.phone_number')
        )
        RETURNING id, email_address, phone_number
    ), u AS (
        INSERT INTO sec.user(
          username,
          password,
          passcode,
          contact_id,
          group_id,
          org_id
        )
        VALUES(
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'sec.user.username'),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'sec.user.password'),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'sec.user.passcode'),
          (SELECT id FROM c),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'sec.user.group_id'),
          (SELECT DISTINCT value FROM SPUSV_eval WHERE map = 'sec.user.org_id')
        )
        RETURNING id, username, is_active, contact_id
      )

    END IF;
    
    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

