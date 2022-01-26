-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_field_data jsonb,

  OUT data jsonb
)
AS
$BODY$
  DECLARE
      _role_id INT := 2;
  BEGIN

    -- convert field_data json to temp table tmp_field_data
    DROP TABLE IF EXISTS tmp_field_data CASCADE;
    CREATE TEMP TABLE tmp_field_data(
      id int,
      value varchar
    );

    INSERT INTO tmp_field_data(id, value)
    VALUES 
    (1, 'test'), 
    (2, 'hello');

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
    SET map = f.map
    FROM org.field f
    WHERE tmp_field.id = f.id;

    SELECT json_agg(tf)::jsonb
    INTO data
    FROM(
        SELECT * FROM tmp_field
    ) tf;

    COMMIT;
  END;
$BODY$
LANGUAGE plpgsql;



CALL sec.pr_user_signup('{}', null);

DROP PROCEDURE IF EXISTS sec.pr_sec_signup;

select * from org.field;