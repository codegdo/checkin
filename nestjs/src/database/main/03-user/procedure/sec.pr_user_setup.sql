-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_login_id int,
  p_form_data json,
  OUT "user" json,
  OUT "locations" json,
  OUT "modules" json
)
AS
$BODY$
  DECLARE
    login_username varchar;
    location_territory_id int;
    user_org_id int;
    user_group_id int;
    user_group_type varchar;
  BEGIN

    -- JSON form_data to table USU_form_data
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
        RETURNING id
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
        RETURNING id, username, contact_id, org_id, group_id, is_active
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
          
          g.id "groupId",
          g.is_owner,
          gt.name "groupType"
        FROM u
        LEFT JOIN sec.group g ON g.id = u.group_id
        LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
        LEFT JOIN org.contact c ON c.id = u.contact_id
      ) r;

      --SET user_org_id
      SELECT "user" ->> 'orgId' INTO user_org_id;
      SELECT "user" ->> 'groupType' INTO user_group_type;
      SELECT "user" ->> 'groupId' INTO user_group_id;

      SELECT json_agg(l)::json
      INTO "locations"
      FROM (
        SELECT id, name 
        FROM org.location
        WHERE org_id = user_org_id
        AND is_active IS NOT NULL
      ) l;

      SELECT json_agg(m.*)::json
      INTO "modules"
      FROM (
        SELECT * FROM dbo.fn_module_get_by_group_type(user_group_type)
      ) m;

    ELSE
      RAISE EXCEPTION no_data_found;
    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS sec.pr_user_setup(int, json, json, json, json);