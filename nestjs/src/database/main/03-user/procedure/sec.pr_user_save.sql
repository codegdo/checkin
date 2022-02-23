-- CREATE PROCEDURE USER_SAVE
CREATE OR REPLACE PROCEDURE sec.pr_user_save(
  p_user_id int,
  p_login_id int,
  p_form_data json,
  OUT data jsonb
)
AS
$BODY$
  DECLARE
    login_username varchar;
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
    INTO login_username
    FROM sec.user
    WHERE id = p_login_id;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

