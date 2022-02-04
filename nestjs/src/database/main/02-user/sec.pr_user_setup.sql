-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_login_id int,
  p_form_data json,
  OUT data json
)
AS
$BODY$
  DECLARE
    login_username varchar;
    workspace_territory_id int;
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

    --SET workspace territory id
    SELECT id
    INTO workspace_territory_id
    FROM(
      SELECT id
      FROM dbo.territory
      WHERE country_code = (
        SELECT DISTINCT value
        FROM tmp_data
        WHERE map = 'org.workspace.country'
      )
      AND state_code = (
        SELECT DISTINCT value
        FROM tmp_data
        WHERE map = 'org.workspace.state'
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
        INSERT INTO org.workspace(
          name,
          street_address,
          territory_id,
          city,
          postal_code,
          org_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.workspace.name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.workspace.street_address'),
          workspace_territory_id,
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.workspace.city'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.workspace.postal_code'),
          (SELECT id FROM o),
          login_username
        )
        RETURNING id
      ), u AS (
        UPDATE sec.user
        SET org_id = (SELECT id FROM o)
        WHERE id = p_login_id
        RETURNING username, org_id
      )
      SELECT json_agg(r)::json ->> 0
      INTO data
      FROM (
        SELECT
          username,
          org_id "orgId",
          (SELECT id from w) "workspaceId"
        FROM u
      ) r;

    END IF;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS sec.pr_user_setup(int, json, json);