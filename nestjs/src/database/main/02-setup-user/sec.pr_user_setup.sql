-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_username varchar,

  p_org_name varchar,
  p_subdomain varchar,

  p_location_name varchar,
  p_street_address varchar,
  p_country varchar,
  p_state varchar,
  p_city varchar,
  p_postal_code varchar,

  "out_username" INOUT varchar,
  "out_locationId" INOUT int,
  "out_orgId" INOUT int
)
AS
$BODY$
  DECLARE
    rec record;
    var_territory_id int;
  BEGIN
    SELECT *
    INTO rec
    FROM sec.user
    WHERE username = p_username AND org_id is NULL;

    IF found THEN

      SELECT id
      INTO var_territory_id
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
        INSERT INTO org.location(
          name,
          street_address,
          territory_id,
          city,
          postal_code,
          org_id
        )
        VALUES(p_location_name, p_street_address, var_territory_id, p_city, p_postal_code, (SELECT id FROM o))
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