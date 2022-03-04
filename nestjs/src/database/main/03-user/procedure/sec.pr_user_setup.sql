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

DROP PROCEDURE IF EXISTS sec.pr_user_setup(int, json, json, json, json, json, json, json);