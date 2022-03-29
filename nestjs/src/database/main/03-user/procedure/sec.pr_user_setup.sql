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

--DROP PROCEDURE IF EXISTS sec.pr_user_setup(json, int, json, json, json, json, json, json);