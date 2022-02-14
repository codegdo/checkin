-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_login_id int,
  p_form_data json,
  OUT "user" json,
  OUT locations json
)
AS
$BODY$
  DECLARE
    login_username varchar;
    location_territory_id int;
    user_org_id int;
  BEGIN

    -- JSON form_data to table tmp_form_data
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
        FROM tmp_data
        WHERE map = 'org.location.country'
      )
      AND state_code = (
        SELECT DISTINCT value
        FROM tmp_data
        WHERE map = 'org.location.state'
      )
    ) t;

    --CHECK user exists
    IF login_username IS NOT NULL THEN

      --INSERT
      WITH o AS (
        INSERT INTO sec.organization(
          name,
          subdomain,
          owner_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.organization.name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.organization.subdomain'),
          p_login_id,
          login_username
        )
        RETURNING id
      ), w AS (
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
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.location.name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.location.street_address'),
          location_territory_id,
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.location.city'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.location.postal_code'),
          (SELECT id FROM o),
          login_username
        )
        RETURNING id
      ), u AS (
        UPDATE sec.user
        SET org_id = (SELECT id FROM o)
        WHERE id = p_login_id
        RETURNING id, username, contact_id, org_id, role_id, is_active
      )
      SELECT json_agg(r)::json ->> 0
      INTO "user"
      FROM (
        SELECT
          u.id "id",
          u.username "username",
          u.org_id "orgId",
          u.is_active,
          
          c.first_name "firstName",
          c.last_name "lastName",
          c.email_address "emailAddress",
          c.phone_number "phoneNumber",
          
          r.id "roleId",
          r.is_owner,
          rt.name "roleType"
        FROM u
        LEFT JOIN sec.role r ON r.id = u.role_id
        LEFT JOIN dbo.role_type rt ON rt.id = r.role_type_id
        LEFT JOIN org.contact c ON c.id = u.contact_id
      ) r;

      --SET user_org_id
      SELECT "user" ->> 'orgId' INTO user_org_id;

      SELECT json_agg(l)::json
      INTO locations
      FROM (
        SELECT id, name 
        FROM org.location
        WHERE org_id = user_org_id
        AND is_active IS NOT NULL
      ) l;
    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS sec.pr_user_setup(int, json, json, json);