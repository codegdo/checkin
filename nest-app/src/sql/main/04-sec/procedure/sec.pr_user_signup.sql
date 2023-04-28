-- USER_SIGNUP
CREATE PROCEDURE main_sec.pr_user_signup(
  p_form_data json,
  OUT data json
) AS $$
DECLARE
  --
BEGIN
  WITH c AS (
    INSERT INTO main_org.contact(first_name, last_name, email_address, phone_number)
    VALUES (
      p_form_data::jsonb ->> 'firstName',
      p_form_data::jsonb ->> 'lastName',
      p_form_data::jsonb ->> 'emailAddress',
      p_form_data::jsonb ->> 'phoneNumber'
    )
    RETURNING id, email_address, phone_number
  ), u AS (
    INSERT INTO main_sec.user(username, password, group_id, contact_id)
    VALUES (
      p_form_data::jsonb ->> 'username',
      p_form_data::jsonb ->> 'password',
      (p_form_data::jsonb ->> 'groupId')::int,
      (SELECT id FROM c)
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
    FROM u LEFT JOIN c ON c.id = u.contact_id
  ) d;
  COMMIT;
  --raise notice 'Value: %', p_form_data::jsonb ->> 'firstName';
  --WITH c AS (), u AS () SELECT json_agg(d)::json ->> 0 INTO data FROM () d;

  --EXCEPTION WHEN SQLSTATE '23505' THEN
  --raise notice 'ERROR %', SQLERRM;
  --raise exception '% %', SQLERRM, SQLSTATE;
END;
$$ LANGUAGE plpgsql;
