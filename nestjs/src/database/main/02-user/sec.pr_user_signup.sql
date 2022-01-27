-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_field_data json,

  OUT data jsonb
)
AS
$BODY$
  DECLARE
      _role_id INT := 2;
  BEGIN

    -- convert field_data json to tmp_field_data
    DROP TABLE IF EXISTS tmp_field_data CASCADE;
    CREATE TEMP TABLE tmp_field_data AS
    SELECT * FROM json_to_recordset(p_field_data)
    AS rec ("id" int, "value" text);

    -- create a tmp_field
    DROP TABLE IF EXISTS tmp_field CASCADE;
    CREATE TEMP TABLE tmp_field(
      id int,
      value varchar,
      map varchar,
      lookup varchar
    );

    -- insert id and value
    INSERT INTO tmp_field(id, value)
    SELECT * FROM tmp_field_data;

    -- insert map and lookup
    UPDATE tmp_field
    SET map = f.map,
        lookup = f.lookup
    FROM org.field f
    WHERE tmp_field.id = f.id;

    SELECT json_agg(tf)::jsonb
    INTO data
    FROM(
        SELECT * FROM tmp_field
    ) tf;

    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;



CALL sec.pr_user_signup('[{"id":1, "value":"gdo"},{"id":2, "value":"123"}]'::json, null);

DROP PROCEDURE IF EXISTS sec.pr_sec_signup CASCADE ;

select * from org.field;