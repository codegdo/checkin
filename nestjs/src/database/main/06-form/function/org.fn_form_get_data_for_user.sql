-- CREATE FUNCTION FN_FORM_GET_DATA_FOR_USER
CREATE OR REPLACE FUNCTION org.fn_form_get_data_for_user(
  p_form_id varchar,
  p_filter_id int,
  p_login_id int,
  p_biz_id int
)
RETURNS TABLE(
  id int,
  value text
) AS
$BODY$
  DECLARE
    user_form_id varchar;
    user_contact_id int;
    user_group_id int;

    user_data json;
    contact_data json;
    group_data json;
    policy_data json;

    eval_id int;
    eval_value text;

    map text;
    map_table text;
    map_column text;

    row_max int;
    row_min int := 1;
  BEGIN
    DROP TABLE IF EXISTS FGDFU_eval CASCADE;
    CREATE TEMP TABLE FGDFU_eval(id int, value text);

    SELECT json_agg(data.*)::json ->> 0
    INTO user_data
    FROM (
      SELECT *
      FROM sec.user u
      WHERE u.id = p_filter_id
    ) data;

    --SET
    SELECT user_data ->> 'contact_id' INTO user_contact_id;
    SELECT user_data ->> 'group_id' INTO user_group_id;
    SELECT user_data ->> 'form_id' INTO user_form_id;

    SELECT json_agg(data.*)::json ->> 0
    INTO contact_data
    FROM (
      SELECT *
      FROM org.contact c
      WHERE c.id = user_contact_id
    ) data;

    SELECT json_agg(data.*)::json ->> 0
    INTO group_data
    FROM (
      SELECT *
      FROM sec.group g
      WHERE g.id = user_group_id
    ) data;

    --REPLACE
    IF user_form_id IS NULL THEN
      user_form_id := p_form_id;
    END IF;

    DROP TABLE IF EXISTS FGDFU_form_field CASCADE;
    CREATE TEMP TABLE FGDFU_form_field AS
    SELECT
      row_number() over () as row_num, *
    FROM (
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_form_get_field(user_form_id, null, p_login_id, p_biz_id)
      UNION
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_form_get_field_component(user_form_id, null, p_login_id, p_biz_id)
    ) ff;

    SELECT max(ff.row_num)
    INTO row_max
    FROM FGDFU_form_field ff;

    WHILE row_max >= row_min
    LOOP

      SELECT field_id, field_map
      INTO eval_id, map
      FROM FGDFU_form_field ff
      WHERE ff.row_num = row_min;

      map_table := split_part(map, '.', 2);
      map_column := split_part(map, '.', 3);

      CASE map_table
        WHEN 'user' THEN
          SELECT user_data ->> map_column INTO eval_value;
        WHEN 'contact' THEN
          SELECT contact_data ->> map_column INTO eval_value;
         WHEN 'group' THEN
          SELECT group_data ->> map_column INTO eval_value;
        ELSE
          eval_value := null;
      END CASE;

      INSERT INTO FGDFU_eval(id, value)
      VALUES (eval_id, eval_value);

      row_min := row_min + 1;
    END LOOP;

    --RAISE NOTICE 'USER DATA %', user_data;

    RETURN QUERY
    SELECT *
    FROM FGDFU_eval;

  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_form_get_data_for_user('3', 1, 1, 1);

DROP FUNCTION IF EXISTS org.fn_form_get_data_for_user;