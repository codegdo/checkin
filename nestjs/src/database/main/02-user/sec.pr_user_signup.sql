-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_phone_number varchar,
  p_username varchar,
  p_password varchar,

  "out_username" INOUT varchar,
  "out_emailAddress" INOUT varchar,
  "out_phoneNumber" INOUT varchar,
  "out_isActive" INOUT boolean
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
      "out_username",
      "out_emailAddress",
      "out_phoneNumber",
      "out_isActive"
      --out_user_signup_return_type
    FROM u
      LEFT JOIN c ON c.id = u.contact_id;

    COMMIT;
  END;
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_signup('kenny'::varchar,'do'::varchar,'giangd@gmail.com'::varchar,'8583571474'::varchar,'kennny'::varchar,'675dac650573721672b492cea4addc28a3f1f6afe93d197abb39cbdca70fcdfe.f4fcd1c555282be2'::varchar, 'null'::text, 'null'::text, 'null'::text, '0'::boolean);
CALL sec.pr_user_signup('kenny'::varchar,'do'::varchar,'giangd@gmail.com'::varchar,'8583571474'::varchar,'kennny'::varchar,'675dac650573721672b492cea4addc28a3f1f6afe93d197abb39cbdca70fcdfe.f4fcd1c555282be2'::varchar, ('null'::varchar,'null'::varchar,'null'::varchar,'0'::boolean)::sec.user_signup_return_type);