-- CREATE FUNCTION USER SIGNUP RETURN
CREATE TYPE sec.user_signup_return_type AS (
    username VARCHAR,
    email_address VARCHAR,
    phone_number VARCHAR
);

-- CREATE FUNCTION USER SIGNUP
CREATE OR REPLACE FUNCTION sec.fn_user_signup(
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email_address VARCHAR,
  p_phone_number VARCHAR,
  p_username VARCHAR,
  p_password VARCHAR,
  r_role_id INT
)
RETURNS SETOF sec.user_signup_return_type
LANGUAGE plpgsql
AS
$$
  BEGIN
    RETURN QUERY
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
      --SELECT p_username, p_password, r_role_id, id FROM c
      VALUES(p_username, p_password, r_role_id, (SELECT id FROM c))
      RETURNING
        username,
        contact_id
    )
    SELECT
      u.username,
      c.email_address,
      c.phone_number
    FROM u
        LEFT JOIN c ON c.id = u.contact_id;
  END;
$$;


-- CREATE FUNCTION USER CONTACT
CREATE OR REPLACE FUNCTION sec.fn_user_contact(p_username VARCHAR)
RETURNS TABLE (
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "emailAddress" VARCHAR,
  "phoneNumber" VARCHAR,
  username VARCHAR
)
LANGUAGE plpgsql
AS
$$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        c.first_name,
        c.last_name,
        c.email_address,
        c.phone_number,
        u.username
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      WHERE u.username = p_username;
  END;
$$;

-- CREATE FUNCTION USER LOGIN
CREATE OR REPLACE FUNCTION sec.fn_user_login(p_username VARCHAR)
RETURNS TABLE (
  id INT,
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "emailAddress" VARCHAR,
  username VARCHAR,
  password VARCHAR,
  "roleId" INT,
  "roleType" dbo.role_type_enum,
  policy JSONB,
  "orgId" INT,
  "orgActive" BOOLEAN,
  "isActive" BOOLEAN,
  "isOwner" BOOLEAN
)
LANGUAGE plpgsql
AS
$$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        u.id,
        c.first_name,
        c.last_name,
        c.email_address,
        u.username,
        u.password,
        r.id,
        rt.name,
        p.data,
        u.org_id,
        o.is_active,
        u.is_active,
        r.is_owner
      FROM sec.user u
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN sec.role_policy rp ON rp.role_id = r.id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.role_type rt ON rt.id = r.role_type_id
      LEFT JOIN sec.organization o ON o.id = u.org_id
      LEFT JOIN org.contact c ON c.id = u.contact_id
      WHERE u.username = p_username;
  END;
$$;


--SELECT (sec.fn_user_signup('giang','do', 'giangd@gmail.com', 'gdo', 'password','{"username":"gdo"}', '123456')).*;
SELECT * FROM sec.fn_user_signup('giang','do', 'giangd@gmail.com', 'gdo', 'password','{"username":"gdo"}', '123456');
SELECT * FROM sec.fn_user_contact('gdo');
SELECT * FROM sec.fn_user_login('gdo');




