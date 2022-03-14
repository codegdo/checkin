-- CREATE FUNCTION FN_GET_EVAL
CREATE OR REPLACE FUNCTION org.fn_get_eval(
  p_form_data json
)
RETURNS TABLE(
  id int,
  value text,
  map text,
  lookup text
) AS
$BODY$
  DECLARE
    row_min int := 1;
    row_max int;
  BEGIN
    --TEMP eval
    DROP TABLE IF EXISTS FGE_eval CASCADE;
    CREATE TEMP TABLE FGE_eval AS
    SELECT r.key id, r.value, r.map, r.lookup
    FROM json_to_recordset(p_form_data)
    AS r ("key" int, "value" text, "map" text, "lookup" text);

    --UPDATE map and lookup
    UPDATE FGE_eval e
    SET map = f.map,
        lookup = f.lookup
    FROM org.field f
    WHERE e.id = f.id;

    --LOOKUP territory
    DROP TABLE IF EXISTS FGE_lookup_territory CASCADE;
    CREATE TEMP TABLE FGE_lookup_territory AS
    SELECT 
      lt.row_num, 
      id, 
      value, 
      lt.map, 
      lookup, 
      lt.country_code, 
      lt.state_code
    FROM (
      WITH e as (
        SELECT 
          e.id, 
          e.value, 
          e.map, 
          e.lookup, 
          row_number() OVER (PARTITION BY e.map) AS row_group
        FROM FGE_eval e
        WHERE e.lookup IS NOT NULL AND split_part(e.lookup, '.', 2) = 'territory'
      ), e1 as (
        SELECT * FROM e WHERE row_group = 1
      ), e2 as (
        SELECT * FROM e WHERE row_group = 2
      )
      SELECT 
        row_number() over() row_num, 
        e1.map, 
        e1.value country_code, 
        e2.value state_code
      FROM e1
      LEFT JOIN e2 on e2.map = e1.map
    ) lt;

    --LOOP
    SELECT max(lt.row_num)
    INTO row_max
    FROM FGE_lookup_territory lt;

    WHILE row_max >= row_min
    LOOP
        
      UPDATE FGE_lookup_territory lt
      SET value = (
        SELECT t.id
        FROM dbo.territory t
        WHERE t.country_code = lt.country_code
        AND t.state_code = lt.state_code
      )::varchar
      WHERE lt.row_num = row_min;

      row_min := row_min + 1;
    END LOOP;

    RETURN QUERY

    SELECT lt.id, lt.value, lt.map, lt.lookup
    FROM FGE_lookup_territory lt
    UNION
    SELECT e.id, e.value, e.map, e.lookup
    FROM FGE_eval e
    WHERE e.lookup IS NULL OR split_part(e.lookup, '.', 2) <> 'territory';

  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_get_eval('
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

DROP FUNCTION org.fn_get_eval;