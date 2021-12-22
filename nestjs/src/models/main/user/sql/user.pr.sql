-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_phone_number varchar,
  p_username varchar,
  p_password varchar,

  "_username" INOUT varchar,
  "_emailAddress" INOUT varchar,
  "_phoneNumber" INOUT varchar,
  "_isActive" INOUT boolean
  --out_user_signup_return_type INOUT sec.user_signup_return_type
)
AS
$BODY$
  DECLARE
      v_role_id INT := 2;
  BEGIN

    WITH c AS (
      INSERT INTO org.contact(
        first_name,
        last_name,
        email_address,
        phone_number
      )
      VALUES (p_first_name, p_last_name, p_email_address, p_phone_number)
      RETURNING
        id,
        email_address,
        phone_number
    ), u AS (
      INSERT INTO sec.user(
        username,
        password,
        role_id,
        contact_id
      )
      VALUES(p_username, p_password, v_role_id, (SELECT id FROM c))
      RETURNING
        username,
        is_active,
        contact_id
    )

    SELECT
      u.username::varchar,
      c.email_address::varchar,
      c.phone_number::varchar,
      u.is_active::boolean
    INTO
      "_username",
      "_emailAddress",
      "_phoneNumber",
      "_isActive"
      --out_user_signup_return_type
    FROM u
      LEFT JOIN c ON c.id = u.contact_id;

    COMMIT;
  END;
$BODY$
LANGUAGE plpgsql;