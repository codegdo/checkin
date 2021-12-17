-- CREATE FUNCTION GET USER
CREATE OR REPLACE FUNCTION sec.fn_get_user(p_username VARCHAR)
RETURNS TABLE (
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "emailAddress" VARCHAR,
  "phoneNumber" VARCHAR,
  username VARCHAR
)
AS
$BODY$
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
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION LOGIN USER
CREATE OR REPLACE FUNCTION sec.fn_login_user(p_username VARCHAR)
RETURNS TABLE (
  id INT,
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "emailAddress" VARCHAR,
  "phoneNumber" VARCHAR,
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
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        u.id,
        c.first_name,
        c.last_name,
        c.email_address,
        c.phone_number,
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
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION USER SIGNUP RETURN
CREATE TYPE sec.user_signup_return_type AS (
  username VARCHAR,
  "emailAddress" VARCHAR,
  "phoneNumber" VARCHAR,
  "isActive" BOOLEAN
);

-- CREATE FUNCTION USER SIGNUP
CREATE OR REPLACE FUNCTION sec.fn_user_signup(
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email_address VARCHAR,
  p_phone_number VARCHAR,
  p_username VARCHAR,
  p_password VARCHAR
)
RETURNS SETOF sec.user_signup_return_type
AS
$BODY$
  DECLARE
    v_role_id INT := 2;
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
      --SELECT p_username, p_password, v_role_id, id FROM c
      VALUES(p_username, p_password, v_role_id, (SELECT id FROM c))
      RETURNING
        username,
        is_active,
        contact_id
    )

    SELECT
      u.username,
      c.email_address,
      c.phone_number,
      u.is_active
    FROM u
      LEFT JOIN c ON c.id = u.contact_id;
  END;
$BODY$
LANGUAGE plpgsql;