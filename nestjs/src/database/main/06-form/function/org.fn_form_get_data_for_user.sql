-- CREATE FUNCTION FN_FORM_GET_DATA_FOR_USER
CREATE OR REPLACE FUNCTION org.fn_form_get_data_for_user(p_user_id int, p_form_id varchar)
RETURNS TABLE(
  id int,
  value text
)
AS
$BODY$
  DECLARE
    user_data json;
    user_form_id varchar;

    eval_id int;
    eval_value text;

    map text;
    map_table text;
    map_column text;

    max_id int;
    min_id int := 1;
  BEGIN
    DROP TABLE IF EXISTS tmp_eval CASCADE;
    CREATE TEMP TABLE tmp_eval(id int, value text);

    SELECT json_agg(data.*)::json ->> 0
    INTO user_data
    FROM (
      SELECT *
      FROM sec.user u
      WHERE u.id = p_user_id
    ) data;

    --SET
    SELECT user_data ->> 'form_id' INTO user_form_id;

    IF user_form_id IS NULL THEN
      user_form_id := p_form_id;
    END IF;

    DROP TABLE IF EXISTS tmp_form_field CASCADE;
    CREATE TEMP TABLE tmp_form_field AS
    SELECT
      row_number() over () as id,
      field_id,
      field_map,
      field_lookup
    FROM org.fn_form_get_field(user_form_id);

    SELECT max(tff.id)
    INTO max_id
    FROM tmp_form_field tff;

    WHILE max_id >= min_id
    LOOP

      SELECT field_id, field_map
      INTO eval_id, map
      FROM tmp_form_field tff
      WHERE tff.id = min_id;

      map_table := split_part(map, '.', 2);
      map_column := split_part(map, '.', 3);

      IF map_table = 'user' THEN
        SELECT user_data ->> map_column INTO eval_value;
      END IF;

      INSERT INTO tmp_eval(id, value)
      VALUES (eval_id, eval_value);

      min_id := min_id + 1;
    END LOOP;

    RAISE NOTICE 'USER DATA %', user_data;

    RETURN QUERY
    SELECT *
    FROM tmp_eval;

  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_form_get_data_for_user('1', 'user_add');

DROP FUNCTION IF EXISTS org.fn_form_get_data_for_user;

select * from sec.user;
select * from org.form;