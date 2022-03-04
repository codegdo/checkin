-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_form_name varchar,
  p_form_data json,
  OUT data json
)
AS
$BODY$
  DECLARE
    user_group_id int := 2;
    user_form_id int;
  BEGIN

    SELECT id 
    INTO user_form_id 
    FROM org.form 
    WHERE name = p_form_name;

    IF user_form_id IS NOT NULL THEN

      -- JSON p_form_data to table tmp_form_data
      DROP TABLE IF EXISTS tmp_form_data CASCADE;
      CREATE TEMP TABLE tmp_form_data AS
      SELECT key AS id, value FROM json_to_recordset(p_form_data)
      AS rec ("key" int, "value" text);

      -- CREATE a table tmp_data
      DROP TABLE IF EXISTS tmp_data CASCADE;
      CREATE TEMP TABLE tmp_data(
        id int,
        value varchar,
        map varchar,
        lookup varchar
      );

      --INSERT id and value
      INSERT INTO tmp_data(id, value)
      SELECT * FROM tmp_form_data;

      --UPDATE map and lookup
      UPDATE tmp_data
      SET map = f.map,
          lookup = f.lookup
      FROM org.field f
      WHERE tmp_data.id = f.id;

      --INSERT
      WITH c AS (
        INSERT INTO org.contact(
          first_name,
          last_name,
          email_address,
          phone_number
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.contact.first_name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.contact.last_name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.contact.email_address'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.contact.phone_number')
        )
        RETURNING id, email_address, phone_number
      ), u AS (
        INSERT INTO sec.user(
          username,
          password,
          contact_id,
          group_id
          --form_id
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.user.username'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.user.password'),
          (SELECT id FROM c),
          (user_group_id)
          --(user_form_id)
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

    END IF;
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
    location_territory_id int;
    user_org_id int;
  BEGIN

    -- JSON form_data to table
    DROP TABLE IF EXISTS USU_form_data CASCADE;
    CREATE TEMP TABLE USU_form_data AS
    SELECT key AS id, value FROM json_to_recordset(p_form_data)
    AS rec ("key" int, "value" text);

    -- CREATE a table USU_data
    DROP TABLE IF EXISTS USU_data CASCADE;
    CREATE TEMP TABLE USU_data(
      id int,
      value varchar,
      map varchar,
      lookup varchar
    );

    --INSERT id and value
    INSERT INTO USU_data(id, value)
    SELECT * FROM USU_form_data;

    --UPDATE map and lookup
    UPDATE USU_data
    SET map = f.map,
      lookup = f.lookup
    FROM org.field f
    WHERE USU_data.id = f.id;

    --SET login username
    SELECT username
    INTO login_username
    FROM sec.user
    WHERE id = p_login_id AND org_id IS NULL;

    --SET location territory id
    SELECT id
    INTO location_territory_id
    FROM(
      SELECT id
      FROM dbo.territory
      WHERE country_code = (
        SELECT DISTINCT value
        FROM USU_data
        WHERE map = 'org.location.country'
      )
      AND state_code = (
        SELECT DISTINCT value
        FROM USU_data
        WHERE map = 'org.location.state'
      )
    ) t;

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
          (SELECT DISTINCT value FROM USU_data WHERE map = 'sec.organization.name'),
          (SELECT DISTINCT value FROM USU_data WHERE map = 'sec.organization.business_type_id')::int,
          (SELECT DISTINCT value FROM USU_data WHERE map = 'sec.organization.subdomain'),
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
          (SELECT DISTINCT value FROM USU_data WHERE map = 'org.location.name'),
          (SELECT DISTINCT value FROM USU_data WHERE map = 'org.location.street_address'),
          location_territory_id,
          (SELECT DISTINCT value FROM USU_data WHERE map = 'org.location.city'),
          (SELECT DISTINCT value FROM USU_data WHERE map = 'org.location.postal_code'),
          (SELECT id FROM o),
          login_username
        )
        RETURNING id
      ), u AS (
        UPDATE sec.user
        SET org_id = (SELECT id FROM o)
        WHERE id = p_login_id
        RETURNING id, org_id
      ) 
      SELECT u.org_id
      INTO user_org_id 
      FROM u;

      CAll sec.pr_user_setup_default();

      SELECT
        ua.users::jsonb ->> 0,
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

-- CREATE PROCEDURE USER_LOGIN
CREATE OR REPLACE PROCEDURE sec.pr_user_login(
  p_username varchar,
  OUT "user" json,
  OUT "locations" json,
  OUT "modules" json,
  OUT "permissions" json,
  OUT "policy" json
)
AS
$BODY$
  DECLARE
      user_org_id int;
      user_group_type varchar;
      user_group_id int;
  BEGIN

    SELECT json_agg(u.*)::json ->> 0
    INTO "user"
    FROM (
      SELECT * FROM sec.fn_user_get_by_id(p_username)
    ) u;

    IF "user" IS NOT NULL THEN

      --SET
      SELECT "user" ->> 'orgId' INTO user_org_id;
      SELECT "user" ->> 'groupType' INTO user_group_type;
      SELECT "user" ->> 'groupId' INTO user_group_id;

      IF user_group_type = 'system' THEN

      ELSE
        IF user_org_id IS NOT NULL THEN
          --CHECK org is_active
          IF(SELECT 1 FROM sec.organization WHERE id = user_org_id AND is_active is TRUE) THEN

            SELECT json_agg(l)::json
            INTO "locations"
            FROM (
              SELECT id, name
              FROM org.location
              WHERE org_id = user_org_id
              AND is_active = true
            ) l;

            SELECT json_agg(m.*)::json
            INTO "modules"
            FROM (
              SELECT * FROM dbo.fn_module_get_by_group_type(user_group_type)
            ) m;

            SELECT json_agg(p.*)::json
            INTO "permissions"
            FROM (
              SELECT * FROM sec.fn_permission_get_access_level()
            ) p;

            SELECT json_agg(p.*)::json ->> 0
            INTO "policy"
            FROM (
              SELECT * FROM sec.fn_policy_get_by_group_id(user_group_id)
            ) p;

          ELSE
            RAISE EXCEPTION no_data_found;
          END IF;
        END IF;
      END IF;
    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

--DROP PROCEDURES
/*
DROP PROCEDURE IF EXISTS sec.pr_user_signup(varchar, json, json);
DROP PROCEDURE IF EXISTS sec.pr_user_verify(int, varchar, varchar, bigint, json);
DROP PROCEDURE IF EXISTS sec.pr_user_confirm(varchar, json);
DROP PROCEDURE IF EXISTS sec.pr_user_setup(int, json, json, json, json);
DROP PROCEDURE IF EXISTS sec.pr_user_login(varchar, json, json, json, json, json);
*/
