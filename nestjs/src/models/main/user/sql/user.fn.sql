-- CREATE FUNCTION GET USER
CREATE OR REPLACE FUNCTION sec.fn_get_user(p_username varchar)
RETURNS TABLE (
  "firstName" varchar,
  "lastName" varchar,
  "emailAddress" varchar,
  "phoneNumber" varchar,
  username varchar
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

-- CREATE FUNCTION USER SIGNUP RETURN
CREATE TYPE sec.user_signup_return_type AS (
  username varchar,
  "emailAddress" varchar,
  "phoneNumber" varchar,
  "isActive" boolean
);

-- CREATE FUNCTION USER SIGNUP
CREATE OR REPLACE FUNCTION sec.fn_user_signup(
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_phone_number varchar,
  p_username varchar,
  p_password varchar
)
RETURNS SETOF sec.user_signup_return_type
AS
$BODY$
  DECLARE
    v_role_id int := 2;
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

-- CREATE FUNCTION LOGIN USER
CREATE OR REPLACE FUNCTION sec.fn_user_login(p_username varchar)
RETURNS TABLE (
  id int,
  "firstName" varchar,
  "lastName" varchar,
  "emailAddress" varchar,
  "phoneNumber" varchar,
  username varchar,
  password varchar,
  "roleId" int,
  "roleType" dbo.role_type_enum,
  policy jsonb,
  "orgId" int,
  "orgActive" boolean,
  "isActive" boolean,
  "isOwner" boolean
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
      WHERE u.username = p_username AND u.is_active = true;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION USER VERIFY
CREATE OR REPLACE FUNCTION sec.fn_user_verify(
  p_username varchar,
  p_key varchar,
  p_type varchar,
  p_data jsonb,
  p_expired_at bigint
)
RETURNS sec.token
AS
$BODY$
  DECLARE
    rec record;
  BEGIN

    SELECT *
    INTO rec
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    WHERE username = p_username;

    IF found THEN

      INSERT INTO sec.token(key, type, data, expired_at)
      VALUES(p_key, p_type, CAST('{"username":"' || rec.username || '", "firstName":"' || rec.first_name || '", "lastName":"' || rec.last_name || '", "phoneNumber":"' || rec.phone_number || '", "emailAddress":"' || rec.email_address || '"}' as jsonb), p_expired_at)
      RETURNING * INTO rec;

    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;

    RETURN rec;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION USER CONFIRM
CREATE OR REPLACE FUNCTION sec.fn_user_confirm(
  p_key varchar
)
RETURNS sec.user
AS
$BODY$
  DECLARE
    rec record;
    current bigint := extract(epoch from now()) * 1000;
  BEGIN

    SELECT *
    INTO rec
    FROM sec.token
    WHERE key = p_key;

    IF found THEN
      IF current < rec.expired_at THEN

        UPDATE sec.user
        SET is_active = true
        WHERE username = rec.data::jsonb ->> 'username'
        RETURNING * INTO rec;

        DELETE FROM sec.token WHERE key = p_key OR current > expired_at;

      ELSE
        RAISE EXCEPTION no_data_found;
      END IF;
    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;

    RETURN rec;
  END;
$BODY$
LANGUAGE plpgsql;



-- CREATE FUNCTION USER VERIFY
-- CREATE OR REPLACE FUNCTION sec.fn_user_verify(
--   p_username varchar, 
--   p_key varchar, 
--   p_data jsonb
-- )
-- RETURNS SETOF record
-- AS
-- $BODY$
--   DECLARE
--     rec record;
--   BEGIN
--     RETURN QUERY
--     WITH u AS (
--       SELECT *
--       INTO STRICT rec
--       FROM sec.user
--       WHERE username = p_username
--       EXCEPTION
--         WHEN no_data_found THEN
--         RAISE EXCEPTION 'No username was found %', p_username;
--     )
--     INSERT INTO sec.token(key, data)
--     VALUES(p_key, p_data)
--     RETURNING INTO rec;
--   END;
-- $BODY$
-- LANGUAGE plpgsql;