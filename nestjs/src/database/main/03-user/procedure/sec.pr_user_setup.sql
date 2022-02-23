-- CREATE PROCEDURE USER_SETUP
CREATE OR REPLACE PROCEDURE sec.pr_user_setup(
  p_login_id int,
  p_form_data json,
  OUT "user" json,
  OUT "stores" json
)
AS
$BODY$
  DECLARE
    login_username varchar;
    store_territory_id int;
    user_biz_id int;
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
    WHERE id = p_login_id AND biz_id IS NULL;

    --SET store territory id
    SELECT id
    INTO store_territory_id
    FROM(
      SELECT id
      FROM dbo.territory
      WHERE country_code = (
        SELECT DISTINCT value
        FROM tmp_data
        WHERE map = 'org.store.country'
      )
      AND state_code = (
        SELECT DISTINCT value
        FROM tmp_data
        WHERE map = 'org.store.state'
      )
    ) t;

    --CHECK user exists
    IF login_username IS NOT NULL THEN

      --INSERT
      WITH b AS (
        INSERT INTO org.business(
          name,
          subdomain,
          owner_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.business.name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.business.subdomain'),
          p_login_id,
          login_username
        )
        RETURNING id
      ), s AS (
        INSERT INTO org.store(
          name,
          street_address,
          territory_id,
          city,
          postal_code,
          biz_id,
          created_by
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.store.name'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.store.street_address'),
          store_territory_id,
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.store.city'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'org.store.postal_code'),
          (SELECT id FROM b),
          login_username
        )
        RETURNING id
      ), u AS (
        UPDATE sec.user
        SET biz_id = (SELECT id FROM b)
        WHERE id = p_login_id
        RETURNING id, username, contact_id, biz_id, group_id, is_active
      )
      SELECT json_agg(r)::json ->> 0
      INTO "user"
      FROM (
        SELECT
          u.id "id",
          u.username "username",
          u.biz_id "bizId",
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

      --SET user_biz_id
      SELECT "user" ->> 'bizId' INTO user_biz_id;

      SELECT json_agg(l)::json
      INTO "stores"
      FROM (
        SELECT id, name 
        FROM org.store
        WHERE biz_id = user_biz_id
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