-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  IN p_form_data json,
  OUT data jsonb
)
AS
$BODY$
  DECLARE
    _userid int;
    _username varchar;
    _role_id int := 2;
  BEGIN

    -- JSON p_form_data to table tmp_form_data
    DROP TABLE IF EXISTS tmp_form_data CASCADE;
    CREATE TEMP TABLE tmp_form_data AS
    SELECT * FROM json_to_recordset(p_form_data)
    AS rec ("id" int, "value" text);

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
        id, 
        username, 
        is_active "isActive", 
        contact_id "contactId", 
        phone_number "phoneNumber", 
        email_address "emailAddress"
      FROM u LEFT JOIN c on c.id = u.contact_id
    ) r;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;



CALL sec.pr_user_signup('[{"id":1, "value":"gdo4"},{"id":2, "value":"123"}]'::json, null::jsonb);

DROP PROCEDURE IF EXISTS sec.pr_user_signup(json, jsonb);

select * from sec.user;
select * from org.contact;