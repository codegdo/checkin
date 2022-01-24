-- CREATE FUNCTION USER_CONFIRM
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

-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_username varchar,

  p_org_name varchar,
  p_subdomain varchar,

  p_workspace_name varchar,
  p_street_address varchar,
  p_country varchar,
  p_state varchar,
  p_city varchar,
  p_postal_code varchar,

  INOUT "out_username" varchar,
  INOUT "out_locationId" int,
  INOUT "out_orgId" int
)
AS
$BODY$
  DECLARE
    rec record;
    _territory_id int;
  BEGIN
    SELECT *
    INTO rec
    FROM sec.user
    WHERE username = p_username AND org_id is NULL;

    IF found THEN

      SELECT id
      INTO _territory_id
      FROM dbo.territory
      WHERE country_code = p_country AND state_code = p_state;

      WITH o AS (
        INSERT INTO sec.organization(
          name,
          subdomain
        )
        VALUES(p_org_name, p_subdomain)
        RETURNING id
      ), l AS (
        INSERT INTO org.workspace(
          name,
          street_address,
          territory_id,
          city,
          postal_code,
          org_id
        )
        VALUES(p_workspace_name, p_street_address, _territory_id, p_city, p_postal_code, (SELECT id FROM o))
        RETURNING id
      ), u AS (
        UPDATE sec.user
        SET org_id = (SELECT id FROM o)
        WHERE username = p_username
        RETURNING username, org_id
      )
      SELECT
        u.username::varchar,
        u.org_id::int,
        (SELECT id FROM l)::int
      INTO
        "out_username",
        "out_orgId",
        "out_locationId"
      FROM u;

    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_phone_number varchar,
  p_username varchar,
  p_password varchar,

  INOUT "out_username" varchar,
  INOUT "out_emailAddress" varchar,
  INOUT "out_phoneNumber" varchar,
  INOUT "out_isActive" boolean
  --out_user_signup_return_type INOUT sec.user_signup_return_type
)
AS
$BODY$
  DECLARE
      _role_id INT := 2;
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
      VALUES(p_username, p_password, _role_id, (SELECT id FROM c))
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

-- CREATE FUNCTION USER_GET
CREATE OR REPLACE FUNCTION sec.fn_user_get(p_username VARCHAR)
RETURNS TABLE (
  id int,
  "firstName" varchar,
  "lastName" varchar,
  "emailAddress" varchar,
  "phoneNumber" varchar,
  username varchar,
  password varchar,
  "roleId" int,
  "roleType" varchar,
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
      WHERE u.username = p_username;
  END;
$BODY$
LANGUAGE plpgsql;




-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
sec.fn_user_confirm;

DROP FUNCTION IF EXISTS
sec.fn_user_verify;

DROP FUNCTION IF EXISTS
sec.fn_user_get;

-- END

-- DROP PROCEDURE

DROP PROCEDURE IF EXISTS
sec.pr_user_setup;

DROP PROCEDURE IF EXISTS
sec.pr_user_signup;

-- END

