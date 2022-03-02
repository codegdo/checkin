-- CREATE PROCEDURE PR_FORM_GET_FOR_USER
CREATE OR REPLACE PROCEDURE org.pr_form_get_for_user(
  p_form_id varchar,
  p_filter_id int,
  p_login_id int,
  p_biz_id int,
  OUT data json
)
AS
$BODY$
  DECLARE
    form_id int;
    form_name varchar;
    form_field jsonb;

    filter_form_id int := 0;
    filter_form_name varchar := '';
    
    row_max int;
    row_min int := 1;
  BEGIN
    --SET
    IF (SELECT p_form_id ~ '^\d+$') THEN
      filter_form_id := p_form_id::int;
    ELSE
      filter_form_name := p_form_id::varchar;
    END IF;

    SELECT f.id, f.name
    INTO form_id, form_name
    FROM org.form f
    WHERE f.id = filter_form_id OR f.name = filter_form_name;

    IF form_id IS NOT NULL THEN
      --TEMP TABLE
      DROP TABLE IF EXISTS FGFU_form_field CASCADE;
      CREATE TEMP TABLE FGFU_form_field AS
      SELECT * FROM org.fn_form_get_field(form_id, p_filter_id, p_login_id, p_biz_id);

      DROP TABLE IF EXISTS FGFU_form_component CASCADE;
      CREATE TEMP TABLE FGFU_form_component AS
      SELECT * FROM org.fn_form_get_field_component(form_id, p_filter_id, p_login_id, p_biz_id);

      --WITH DATA
      IF p_filter_id > 0 THEN

        DROP TABLE IF EXISTS FGFU_eval CASCADE;
        CREATE TEMP TABLE FGFU_eval(id int, value text);
        
        IF form_name = 'user_form' THEN
          INSERT INTO FGFU_eval(id, value)
          SELECT id, value 
          FROM org.fn_form_get_data_for_user(p_form_id, p_login_id, p_biz_id);
        END IF;

        --SET FIELD VALUE
        SELECT max(ff.row_num)
        INTO row_max
        FROM FGFU_form_field ff;

        WHILE row_max >= row_min
        LOOP
          UPDATE FGFU_form_field ff
          SET field_value = (SELECT value FROM FGFU_eval e WHERE e.id = ff.field_id)
          WHERE ff.row_num = row_min;

          row_min := row_min + 1;
        END LOOP;

        --SET COMPONENT FIELD VALUE
        row_min := 1;

        SELECT max(cf.row_num)
        INTO row_max
        FROM FGFU_form_component cf;

        WHILE row_max >= row_min
        LOOP
          UPDATE FGFU_form_component cf
          SET field_value = (SELECT value FROM FGFU_eval e WHERE e.id = cf.field_id)
          WHERE cf.row_num = row_min;

          row_min := row_min + 1;
        END LOOP;
      END IF;

      --MAP COMPONENT FIELD TO FIELD

      --MAP FIELD TO FORM
      SELECT json_agg(field)::jsonb
      INTO form_field
      FROM (
        SELECT
          ff.field_id id,
          ff.field_name name,
          ff.field_label label,
          ff.field_description description,
          ff.field_type type,
          ff.field_role role,
          ff.field_data data,
          ff.field_value value,
          ff.field_lookup lookup,
          ff.field_map map,
          ff.field_position position,
          ff.field_parent_id "parentId",
          ff.field_is_required "isRequired",
          ff.field_has_dependent "hasDependent",
          ff.field_is_dependent "isDependent"
        FROM FGFU_form_field ff
        ORDER BY field_position
      ) field;

      SELECT json_agg(form)::json
      INTO data
      FROM (
        SELECT DISTINCT
        f.form_id id,
        f.form_name name,
        f.form_label label,
        f.form_data data,
        f.form_field fields
        FROM FGFU_form_field f
      ) form;

    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS org.pr_form_get_for_user(varchar, int, int, int, json);

CALL org.pr_form_get_for_user('3', 1, 1, 1, null);