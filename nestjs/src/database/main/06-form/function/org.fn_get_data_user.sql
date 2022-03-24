-- CREATE FUNCTION FN_GET_DATA_USER
CREATE OR REPLACE FUNCTION org.fn_get_data_user(
  p_form_id int,
  p_filter_id int,
  p_login_id int,
  p_org_id int
)
RETURNS TABLE(
  id int,
  value text
) AS
$BODY$
  DECLARE
    user_form_id int;
    user_contact_id int;
    user_group_id int;
    user_location_id int;

    user_data json;
    contact_data json;
    group_data json;
    location_data json;
    policy_data json;

    eval_id int;
    eval_value text;

    map_data text;
    map_table text;
    map_column text;

    row_max int;
    row_min int := 1;
  BEGIN
    DROP TABLE IF EXISTS FGDU_eval CASCADE;
    CREATE TEMP TABLE FGDU_eval(id int, value text);

    SELECT json_agg(data)::json ->> 0
    INTO user_data
    FROM (
      SELECT
        u.username,
        u.password,
        u.passcode,
        u.contact_id,
        u.group_id,
        u.form_id,
        ul.location_id
      FROM sec.user u
      INNER JOIN sec.user_location ul ON ul.user_id = u.id
      LEFT JOIN org.location l ON l.id = ul.location_id
      WHERE u.id = p_filter_id
    ) data;

    --SET
    SELECT user_data ->> 'contact_id' INTO user_contact_id;
    SELECT user_data ->> 'group_id' INTO user_group_id;
    SELECT user_data ->> 'form_id' INTO user_form_id;
    SELECT user_data ->> 'location_id' INTO user_location_id;

    SELECT json_agg(data)::json ->> 0
    INTO contact_data
    FROM (
      SELECT *
      FROM org.contact c
      WHERE c.id = user_contact_id
    ) data;

    SELECT json_agg(data)::json ->> 0
    INTO group_data
    FROM (
      SELECT *
      FROM sec.group g
      WHERE g.id = user_group_id
    ) data;

    SELECT json_agg(data)::json ->> 0
    INTO location_data
    FROM (
      SELECT *
      FROM sec.user_location ul
      WHERE ul.location_id = user_location_id
    ) data;

    --REPLACE
    IF user_form_id IS NULL THEN
      user_form_id := p_form_id;
    END IF;

    DROP TABLE IF EXISTS FGDU_form_field CASCADE;
    CREATE TEMP TABLE FGDU_form_field AS
    SELECT
      row_number() over () as row_num, *
    FROM (
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_get_field(user_form_id, p_login_id, p_org_id)
      UNION
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_get_field_component(user_form_id, p_login_id, p_org_id)
    ) ff;

    SELECT max(ff.row_num)
    INTO row_max
    FROM FGDU_form_field ff;

    WHILE row_max >= row_min
    LOOP

      SELECT field_id, field_map
      INTO eval_id, map_data
      FROM FGDU_form_field ff
      WHERE ff.row_num = row_min;

      map_table := split_part(map_data, '.', 2);
      map_column := split_part(map_data, '.', 3);

      CASE map_table
        WHEN 'user' THEN
          SELECT user_data ->> map_column INTO eval_value;
        WHEN 'contact' THEN
          SELECT contact_data ->> map_column INTO eval_value;
        WHEN 'user_location' THEN
          SELECT location_data ->> map_column INTO eval_value;
        WHEN 'group' THEN
          SELECT group_data ->> map_column INTO eval_value;
        ELSE
          eval_value := null;
      END CASE;

      INSERT INTO FGDU_eval(id, value)
      VALUES (eval_id, eval_value);

      row_min := row_min + 1;
    END LOOP;

    --RAISE NOTICE 'USER DATA %', user_data;

    RETURN QUERY
    SELECT *
    FROM FGDU_eval;

  END;
$BODY$
LANGUAGE plpgsql;

--SELECT * FROM org.fn_get_data_user('3', 1, 1, 1);
