CREATE OR REPLACE FUNCTION org.fn_get_eval_data(
  p_form_data json
)
RETURNS TABLE(
  row_number bigint,
  value text,
  m text,
  l1 text,
  l2 text
) AS
$BODY$
  DECLARE
      row_min int := 1;
      row_max int;
  BEGIN
    --TEMP eval
    DROP TABLE IF EXISTS OFGED_eval CASCADE;
    CREATE TEMP TABLE OFGED_eval AS
    SELECT r.key id, r.value, r.map, r.lookup
    FROM json_to_recordset(p_form_data)
    AS r ("key" int, "value" text, "map" text, "lookup" text);

    --UPDATE map and lookup
    UPDATE OFGED_eval e
    SET map = f.map,
      lookup = f.lookup
    FROM org.field f
    WHERE e.id = f.id;

    DROP TABLE IF EXISTS OFGED_data CASCADE;
    CREATE TEMP TABLE OFGED_data AS
    SELECT d.row_number, value, d.map, d.lookup1, d.lookup2
    FROM (
         WITH e as (
            SELECT e.id, e.map, e.lookup, row_number() OVER (PARTITION BY "map") AS row_group
            FROM OFGED_eval e
            WHERE e.lookup IS NOT NULL AND split_part(e.lookup, '.', 2) = 'territory'
        ), e1 as (
            SELECT * FROM e WHERE row_group = 1
        ), e2 as (
            SELECT * FROM e WHERE row_group = 2
        )
        SELECT row_number() over() row_number, e1.map, e1.lookup lookup1, e2.lookup lookup2
        FROM e1
        LEFT JOIN e2 on e2.map = e1.map
    ) d;

    RETURN QUERY

    SELECT * FROM OFGED_data d;


    /*
    SELECT *
    FROM OFGED_eval e
    WHERE e.lookup IS NOT NULL AND split_part(e.lookup, '.', 2) = 'territory';
    */

  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_get_eval_data('
[
  {"key":"4", "value": "Mira Mesa"},
  {"key":"9", "value": "8583571474"},
  {"key":"10", "value": "123 abc street"},
  {"key":"11", "value": "USA"},
  {"key":"12", "value": "CA"},
  {"key":"13", "value": "San Diego"},
  {"key":"14", "value": "92126"}
]
');


DROP FUNCTION org.fn_get_eval_data;