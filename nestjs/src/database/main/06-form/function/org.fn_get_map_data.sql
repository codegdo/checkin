CREATE OR REPLACE FUNCTION org.fn_get_map_data(
  p_form_data json
)
RETURN TABLE(
  id int,
  value varchar,
  map varchar,
  lookup varchar
) AS
$BODY$
  DECLARE
  BEGIN
    --TEMP form_data
    DROP TABLE IF EXISTS OFGMD_form_data CASCADE;
    CREATE TEMP TABLE OFGMD_form_data AS
    SELECT key AS id, value 
    FROM json_to_recordset(p_form_data)
    AS rec ("key" int, "value" text);

    --TEMP eval
    DROP TABLE IF EXISTS OFGMD_eval CASCADE;
    CREATE TEMP TABLE OFGMD_eval(
      id int,
      value varchar,
      map varchar,
      lookup varchar
    );

    --INSERT id and value
    INSERT INTO OFGMD_eval(id, value)
    SELECT * FROM OFGMD_form_data;

    --UPDATE map and lookup
    UPDATE OFGMD_eval e
    SET map = f.map,
      lookup = f.lookup
    FROM org.field f
    WHERE e.id = f.id;

  END;
$BODY$
LANGUAGE plpgsql;