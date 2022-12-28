CREATE PROCEDURE sec.pr_user_signup(
  p_form_data json,
  OUT data json
) as $$
DECLARE
  --
BEGIN
  WITH c as (
    INSERT INTO org.contact(first_name, last_name, email_address, phone_number)
    VALUES(
      p_form_data::jsonb ->> 'firstName',
      p_form_data::jsonb ->> 'lastName',
      p_form_data::jsonb ->> 'emailAddress',
      p_form_data::jsonb ->> 'phoneNumber'
    )
    RETURNING id, email_address, phone_number
  ), u as (
    INSERT INTO sec.user(username, password, group_id, contact_id)
    VALUES(
      p_form_data::jsonb ->> 'username',
      p_form_data::jsonb ->> 'password',
      (p_form_data::jsonb ->> 'groupId')::int,
      (select id from c)
    )
    RETURNING id, username, contact_id, is_active
  )
  SELECT json_agg(d)::json ->> 0
  INTO data
  FROM (
    SELECT
      u.id "id",
      u.username "username",
      u.is_active "isActive",
      c.phone_number "phoneNumber",
      c.email_address "emailAddress"
    FROM u LEFT JOIN c on c.id = u.contact_id
  ) d;
  COMMIT;
  --raise notice 'Value: %', p_form_data::jsonb ->> 'firstName';
  --WITH c as (), u as () SELECT json_agg(d)::json ->> 0 INTO data FROM () d;

  --EXCEPTION when SQLSTATE '23505' then
  --raise notice 'ERROR %', SQLERRM;
  --raise exception '% %', SQLERRM, SQLSTATE;
END;
$$ language plpgsql;

CALL sec.pr_user_signup('{"firstName": "giang", "lastName":"do", "emailAddress":"giang@cmr.bz", "phoneNumber":"8583571474", "username":"gdo3", "password":"do", "groupId":1}', null);

select * from sec.user;
select * from org.contact;




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