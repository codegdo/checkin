-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.sp_user_signup(
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_username varchar,
  p_password varchar,
  p_data jsonb,
  p_expired_at integer
)
AS
$$
  BEGIN
    INSERT INTO sec.user(
      username,
      password
    )
    VALUES(p_username, p_password);

    INSERT INTO sec.user(
      email_address
    )
    VALUES(p_email_address);
    COMMIT;
  END;
$$
LANGUAGE plpgsql;

CALL sec.sp_user_signup('giangd@gmail.com', 'gdo', 'password');