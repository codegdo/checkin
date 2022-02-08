-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_form_name varchar,
  p_form_data json,
  OUT data json
)
AS
$BODY$
  DECLARE
    user_role_id int := 2;
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
          role_id
          --form_id
        )
        VALUES(
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.user.username'),
          (SELECT DISTINCT value FROM tmp_data WHERE map = 'sec.user.password'),
          (SELECT id FROM c),
          (user_role_id)
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

CALL sec.pr_user_signup('auth_signup', '[]', null);

DROP PROCEDURE IF EXISTS sec.pr_user_signup(varchar, json, json);