CREATE OR REPLACE PROCEDURE org.pr_form_get_for_user(
  p_user_id int,
  p_form_id varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    _max int;
    _min int := 1;
  BEGIN

    DROP TABLE IF EXISTS FGFU_form_field CASCADE;
    CREATE TEMP TABLE FGFU_form_field AS
    SELECT * FROM org.fn_form_get_field(p_form_id);

    DROP TABLE IF EXISTS FGFU_component_field CASCADE;
    CREATE TEMP TABLE FGFU_component_field AS
    SELECT * FROM org.fn_form_get_component(p_form_id);

    IF p_user_id > 0 THEN

        DROP TABLE IF EXISTS FGFU_eval CASCADE;
        CREATE TEMP TABLE FGFU_eval AS
        SELECT * FROM org.fn_form_get_data_for_user(p_user_id, p_form_id);

        --SET FIELD VALUE
        SELECT max(ff.row_id)
        INTO _max
        FROM FGFU_form_field ff;

        WHILE _max >= _min
        LOOP
          UPDATE FGFU_form_field ff
          SET field_value = (SELECT value FROM FGFU_eval e WHERE e.id = ff.field_id)
          WHERE ff.row_id = _min;

          _min := _min + 1;
        END LOOP;

        --SET COMPONENT FIELD VALUE
        _min := 1;

        SELECT max(cf.row_id)
        INTO _max
        FROM FGFU_component_field cf;

        WHILE _max >= _min
        LOOP
          UPDATE FGFU_component_field cf
          SET field_value = (SELECT value FROM FGFU_eval e WHERE e.id = cf.field_id)
          WHERE cf.row_id = _min;

          _min := _min + 1;
        END LOOP;
    END IF;

    --MAP COMPONENT FIELD TO FIELD

    
    SELECT json_agg(field)::jsonb
    INTO data
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
        field_is_required "isRequired"
      FROM FGFU_form_field
      ORDER BY field_position
    ) field;

  END;
$BODY$
LANGUAGE plpgsql;

CALL org.pr_form_get_for_user(1, '1', null);

DROP PROCEDURE IF EXISTS org.pr_form_get_for_user(int, varchar, json);

CALL org.pr_form_get_by_id('1', null);