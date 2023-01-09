-- USER_SIGNUP
CREATE PROCEDURE "main.sec".pr_user_signup(
  p_form_data json,
  OUT data json
) as $$
DECLARE
  --
BEGIN
  WITH c as (
    INSERT INTO "main.org".contact(first_name, last_name, email_address, phone_number)
    VALUES(
      p_form_data::jsonb ->> 'firstName',
      p_form_data::jsonb ->> 'lastName',
      p_form_data::jsonb ->> 'emailAddress',
      p_form_data::jsonb ->> 'phoneNumber'
    )
    RETURNING id, email_address, phone_number
  ), u as (
    INSERT INTO "main.sec".user(username, password, group_id, contact_id)
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

CALL "main.sec".pr_user_signup('{"firstName": "giang", "lastName":"do", "emailAddress":"giang@cmr.bz", "phoneNumber":"8583571474", "username":"gdo3", "password":"do", "groupId":1}', null);

select * from "main.sec".user;
select * from "main.org".contact;


