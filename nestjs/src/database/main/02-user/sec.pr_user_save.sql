-- CREATE PROCEDURE USER_SAVE
CREATE OR REPLACE PROCEDURE sec.pr_user_save(
  IN p_user_id int,
  IN p_login_id int,
  IN p_form_data json,
  OUT data jsonb
)
AS
$BODY$
  DECLARE
    _username varchar;
    _login_username varchar;
    -workspace_territory_id int;
  BEGIN

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

    --SET login username
    SELECT username
    INTO _login_username
    FROM sec.user
    WHERE id = p_login_id;

    --SET workspace territory id
    SELECT id
    INTO _workspace_territory_id
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
        role_id,
        contact_id
      )
      VALUES(
        (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.user.username'),
        (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.user.password'),
        (_role_id),
        (SELECT id FROM c)
      )
      RETURNING username, is_active, contact_id
    )
    SELECT json_agg(r)::jsonb
    INTO data
    FROM (
      SELECT
        username,
        is_active "isActive",
        phone_number "phoneNumber",
        email_address "emailAddress"
      FROM u LEFT JOIN c on c.id = u.contact_id
    ) r;

    COMMIT;
  END
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
  INOUT "out_workspaceId" int,
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
        "out_workspaceId"
      FROM u;

    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_setup(
  'gdo'::varchar,

  'Serenity Nail'::varchar,
  'serenitynail'::varchar,

  'Serenity Nail Mira Mesa'::varchar,
  '1234 Camaruiz Rd'::varchar,
  'USA'::varchar,
  'CA'::varchar,
  'San Diego'::varchar,
  '92126'::varchar,

  ''::varchar,
  ''::varchar,
  ''::varchar
);