-- CREATE PROCEDURE USER_CONFIRM
CREATE OR REPLACE PROCEDURE sec.pr_user_confirm(
  p_key varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    rec_token record;
    current bigint := extract(epoch from now()) * 1000;
  BEGIN

    SELECT *
    INTO rec_token
    FROM sec.token
    WHERE key = p_key;

    IF found THEN
      IF current < rec_token.expired_at THEN

        UPDATE sec.user
        SET is_active = true
        WHERE username = rec_token.data::jsonb ->> 'username'
        RETURNING * INTO data;

        DELETE FROM sec.token WHERE key = p_key OR current > expired_at;

      ELSE
        RAISE EXCEPTION no_data_found;
      END IF;
    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE USER_GET_ALL
CREATE OR REPLACE PROCEDURE sec.pr_user_get_all(
  p_login_type varchar,
  p_org_id int,
  p_location_id int,

  OUT config json,
  OUT columns json,
  OUT users json
)
AS
$BODY$
  DECLARE
  BEGIN

  SELECT json_agg(r)::json
  INTO config
  FROM (
    SELECT
    gv.with_paging "withPaging"
    FROM org.fn_get_gridview('setup_users', p_org_id) gv
  ) r;

  SELECT json_agg(r)::json
  INTO columns
  FROM (
    SELECT
    gv.id "id",
    gv.name "name",
    gv.label "label",
    gv.type "type",
    gv.data "data",
    gv.is_default "isDefault",
    gv.is_search "isSearch"
    FROM
    org.fn_get_gridview_column('setup_users', p_org_id) gv
    WHERE gv.is_visible = true
  ) r;

  SELECT json_agg(r)::json
  INTO users
  FROM (
    SELECT DISTINCT
      u.id "id",
      u.username "username",
      u.first_name "firstName",
      u.last_name "lastName",
      u.email_address "emailAddress",
      u.phone_number "phoneNumber",
      u.group_level "level",
      u.group_name "group",
      u.group_type "type",
      u.is_active "isActive"
    FROM (SELECT * FROM sec.fn_get_user_for_org(p_org_id)) u
    LEFT JOIN sec.user_location ul ON ul.user_id = u.id
    LEFT JOIN org.location l ON l.id = ul.location_id
    WHERE (
      CASE
        WHEN (p_login_type = 'system') THEN
          ul.location_id = p_location_id OR ul.location_id IS NULL
        ELSE
          ul.location_id = p_location_id
      END
    )
  ) r;

  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE USER_LOGIN
CREATE OR REPLACE PROCEDURE sec.pr_user_login(
  p_username varchar,

  OUT "user" json,
  OUT locations json,
  OUT organizations json,
  OUT modules json,
  OUT permissions json,
  OUT policies json
)
AS
$BODY$
  DECLARE
      user_id int;
      user_org_id int;
      user_is_active boolean;

      user_group_id int;
      user_group_type varchar;
  BEGIN

    SELECT id, org_id, group_type, is_active
    INTO user_id, user_org_id, user_group_type, user_is_active
    FROM sec.fn_get_user(p_username);

    IF user_id IS NOT NULL AND user_is_active IS TRUE AND user_org_id IS NOT NULL THEN

      IF user_group_type = 'system' THEN

      ELSE
        SELECT
          ua.user,
          ua.locations,
          ua.organizations,
          ua.modules,
          ua.permissions,
          ua.policies
        INTO
          "user",
          locations,
          organizations,
          modules,
          permissions,
          policies
        FROM sec.fn_get_user_access(user_id) ua;
      END IF;
    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE USER_SAVE
CREATE OR REPLACE PROCEDURE sec.pr_user_save(
  p_form_data json,
  p_form_id int,
  p_user_id int,
  p_login_id int,

  OUT data jsonb
)
AS
$BODY$
  DECLARE
    login_username varchar;
    org_id int;
  BEGIN
    --TEMP
    DROP TABLE IF EXISTS PUSV_eval CASCADE;
    CREATE TEMP TABLE PUSV_eval AS
    SELECT * FROM org.fn_get_eval(p_form_data);

    --SET vars
    SELECT u.username, u.org_id
    INTO login_username, org_id
    FROM sec.user u
    WHERE u.id = p_login_id;

    --CHECK login exists
    IF login_username IS NOT NULL THEN

      --CHECK
      IF p_user_id = 0 THEN

        --INSERT
        WITH c AS (
          INSERT INTO org.contact(
            first_name,
            last_name,
            email_address,
            phone_number
          )
          VALUES(
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.first_name'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.last_name'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.email_address'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'org.contact.phone_number')
          )
          RETURNING id, email_address, phone_number
        ), u AS (
          INSERT INTO sec.user(
            username,
            password,
            passcode,
            contact_id,
            group_id,
            form_id,
            org_id,
            is_new_password,
            is_active,
            created_by
          )
          VALUES(
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.username'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.password'),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.passcode'),
            (SELECT id FROM c),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.group_id')::int,
            (p_form_id),
            (org_id),
            (true),
            (true),
            (login_username)
          )
          RETURNING id, username, is_active, contact_id
        ), ul AS (
          INSERT INTO sec.user_location(user_id, location_id)
          VALUES(
            (SELECT id FROM u),
            (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user_location.location_id')::int
          )
        )
        SELECT id
        INTO data
        FROM u;

      ELSE
        --UPDATE
        WITH u AS (
          UPDATE sec.user _u
          SET
            username = (SELECT DISTINCT value FROM PUSV_eval WHERE map = 'sec.user.username')
          WHERE _u.id = p_user_id
          RETURNING _u.id
        )
        SELECT id
        INTO data
        FROM u;
      END IF;

    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_form_data json,
  p_login_id int,

  OUT "user" json,
  OUT locations json,
  OUT organizations json,
  OUT modules json,
  OUT permissions json,
  OUT policies json
)
AS
$BODY$
  DECLARE
    login_username varchar;
    org_id int;

    _groups json;
  BEGIN
    --TEMP
    DROP TABLE IF EXISTS PUSE_eval CASCADE;
    CREATE TEMP TABLE PUSE_eval AS
    SELECT * FROM org.fn_get_eval(p_form_data);

    --SET username
    SELECT username
    INTO login_username
    FROM sec.user u
    WHERE u.id = p_login_id AND u.org_id IS NULL;

    --CHECK user exists
    IF login_username IS NOT NULL THEN

      --INSERT
      WITH o AS (
        INSERT INTO sec.organization(
          name,
          business_type_id,
          subdomain,
          owner_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'sec.organization.name'),
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'sec.organization.business_type_id')::INT,
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'sec.organization.subdomain'),
          p_login_id,
          login_username
        )
        RETURNING id, business_type_id
      ), s AS (
        INSERT INTO org.location(
          name,
          street_address,
          territory_id,
          city,
          postal_code,
          org_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'org.location.name'),
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'org.location.street_address'),
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'org.location.territory_id')::INT,
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'org.location.city'),
          (SELECT DISTINCT value FROM PUSE_eval WHERE map = 'org.location.postal_code'),
          (SELECT id FROM o),
          login_username
        )
        RETURNING id
      ), u AS (
        UPDATE sec.user u
        SET org_id = (SELECT id FROM o)
        WHERE u.id = p_login_id
        RETURNING u.id, u.org_id
      )
      SELECT u.org_id
      INTO org_id
      FROM u;

      --SET DEFAULT
      PERFORM sec.fn_set_org_default(org_id, p_login_id);

      SELECT
        ua.user,
        ua.locations,
        ua.organizations,
        ua.modules,
        ua.permissions,
        ua.policies
      INTO
        "user",
        locations,
        organizations,
        modules,
        permissions,
        policies
      FROM sec.fn_get_user_access(p_login_id) ua;

    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

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
          u.id,
          u.username,
          u.is_active "isActive",
          c.phone_number "phoneNumber",
          c.email_address "emailAddress"
        FROM u LEFT JOIN c on c.id = u.contact_id
      ) r;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE USER_VERIFY
CREATE OR REPLACE PROCEDURE sec.pr_user_verify(
  p_user_id int,
  p_key varchar,
  p_type varchar,
  p_expired_at bigint,
  OUT data json
)
AS
$BODY$
  DECLARE
    rec record;
  BEGIN
    SELECT *
    INTO rec
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    WHERE u.id = p_user_id;

    IF found THEN

      INSERT INTO sec.token(key, type, data, expired_at)
      VALUES(p_key, p_type, CAST('{"username":"' || rec.username || '", "firstName":"' || rec.first_name || '", "lastName":"' || rec.last_name || '", "phoneNumber":"' || rec.phone_number || '", "emailAddress":"' || rec.email_address || '"}' as jsonb), p_expired_at)
      RETURNING * INTO rec;

      data := json_agg(rec)::json ->> 0;
    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

/* DROP PROCEDURES

DROP PROCEDURE IF EXISTS sec.pr_user_confirm(varchar, json);
DROP PROCEDURE IF EXISTS sec.pr_user_get_all(varchar, integer, integer, json, json, json);
DROP PROCEDURE IF EXISTS sec.pr_user_login(varchar, json, json, json, json, json, json);
DROP PROCEDURE IF EXISTS sec.pr_user_save(json, int, int, int, jsonb);
DROP PROCEDURE IF EXISTS sec.pr_user_setup(json, int, json, json, json, json, json, json);
DROP PROCEDURE IF EXISTS sec.pr_user_signup(json, json);
DROP PROCEDURE IF EXISTS sec.pr_user_verify(int, varchar, varchar, bigint, json);
*/
