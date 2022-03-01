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
    formname varchar;
    form_field jsonb;

    filter_id int := 0;
    filter_name varchar := '';
    
    row_max int;
    row_min int := 1;
  BEGIN

    IF (SELECT p_form_id ~ '^\d+$') THEN
      filter_id := p_form_id::int;
    ELSE
      filter_name := p_form_id::varchar;
    END IF;

    --SET form_name
    SELECT f.name
    INTO formname
    FROM org.form f
    WHERE f.id = filter_id OR f.name = filter_name;

    IF formname IS NOT NULL THEN

      DROP TABLE IF EXISTS FGFU_form_field CASCADE;
      CREATE TEMP TABLE FGFU_form_field AS
      SELECT * FROM org.fn_form_get_field(p_form_id, p_filter_id, p_login_id, p_biz_id);

      DROP TABLE IF EXISTS FGFU_form_component CASCADE;
      CREATE TEMP TABLE FGFU_form_component AS
      SELECT * FROM org.fn_form_get_field_component(p_form_id, p_filter_id, p_login_id, p_biz_id);

      IF p_filter_id > 0 THEN

        --
        DROP TABLE IF EXISTS FGFU_eval CASCADE;
        CREATE TEMP TABLE FGFU_eval(id int, value text);
        
        INSERT INTO FGFU_eval(id, value)
        SELECT id, value 
        FROM org.fn_form_get_data_for_user(p_form_id, p_filter_id, p_login_id, p_biz_id);

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


      SELECT json_agg(field)::jsonb
      INTO form_field
      FROM (
        SELECT
          field_id id,
          field_name name,
          field_label label,
          field_description description,
          field_type type,
          field_role role,
          field_data data,
          field_value value,
          field_lookup lookup,
          field_map map,
          field_position position,
          field_parent_id "parentId",
          field_is_required "isRequired",
          field_has_dependent "hasDependent",
          field_is_dependent "isDependent"
        FROM FGFU_form_field
        ORDER BY field_position
      ) field;

      SELECT json_agg(form)::json
      INTO data
      FROM (
        SELECT DISTINCT
        form_id id,
        form_name name,
        form_label label,
        form_data data,
        form_field fields
        FROM FGFU_form_field
      ) form;

    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS org.pr_form_get_for_user(varchar, int, int, int, json);

CALL org.pr_form_get_for_user('3', 1, 1, 1, null);