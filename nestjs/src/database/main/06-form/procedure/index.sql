-- CREATE PROCEDURE PR_FORM_GET_BY_ID
CREATE OR REPLACE PROCEDURE org.pr_form_get_by_id(
  p_form_id varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    form_field_data jsonb;
  BEGIN
    --DROP TABLE IF EXISTS tmp_eval CASCADE;
    --CREATE TEMP TABLE tmp_eval AS
    --SELECT * FROM org.fn_get_user();

    DROP TABLE IF EXISTS FGBI_form_field CASCADE;
    CREATE TEMP TABLE FGBI_form_field AS
    SELECT * FROM org.fn_form_get_field(p_form_id, null, null);

    SELECT json_agg(field)::jsonb
    INTO form_field_data
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
      FROM FGBI_form_field
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
      form_field_data fields
      FROM FGBI_form_field
    ) form;

  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE PR_FORM_GET_FOR_USER
CREATE OR REPLACE PROCEDURE org.pr_form_get_for_user(
  p_form_id varchar,
  p_user_id int,
  p_biz_id int,
  OUT data json
)
AS
$BODY$
  DECLARE
    form_field_data jsonb;

    _max int;
    _min int := 1;
  BEGIN

    DROP TABLE IF EXISTS FGFU_form_field CASCADE;
    CREATE TEMP TABLE FGFU_form_field AS
    SELECT * FROM org.fn_form_get_field(p_form_id, p_user_id, p_biz_id);

    DROP TABLE IF EXISTS FGFU_form_component CASCADE;
    CREATE TEMP TABLE FGFU_form_component AS
    SELECT * FROM org.fn_form_get_component(p_form_id, p_user_id, p_biz_id);

    IF p_user_id > 0 THEN

      DROP TABLE IF EXISTS FGFU_eval CASCADE;
      CREATE TEMP TABLE FGFU_eval AS
      SELECT * FROM org.fn_form_get_data_for_user(p_form_id, p_user_id, p_biz_id);

      --SET FIELD VALUE
      SELECT max(ff.row_num)
      INTO _max
      FROM FGFU_form_field ff;

      WHILE _max >= _min
      LOOP
        UPDATE FGFU_form_field ff
        SET field_value = (SELECT value FROM FGFU_eval e WHERE e.id = ff.field_id)
        WHERE ff.row_num = _min;

        _min := _min + 1;
      END LOOP;

      --SET COMPONENT FIELD VALUE
      _min := 1;

      SELECT max(cf.row_num)
      INTO _max
      FROM FGFU_form_component cf;

      WHILE _max >= _min
      LOOP
        UPDATE FGFU_form_component cf
        SET field_value = (SELECT value FROM FGFU_eval e WHERE e.id = cf.field_id)
        WHERE cf.row_num = _min;

        _min := _min + 1;
      END LOOP;
    END IF;

    --MAP COMPONENT FIELD TO FIELD


    SELECT json_agg(field)::jsonb
    INTO form_field_data
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

    SELECT json_agg(form)::json
    INTO data
    FROM (
      SELECT DISTINCT
      form_id id,
      form_name name,
      form_label label,
      form_data data,
      form_field_data fields
      FROM FGFU_form_field
    ) form;

  END;
$BODY$
LANGUAGE plpgsql;

CALL org.pr_form_get_by_id('auth_signup', null);

DROP PROCEDURE IF EXISTS org.pr_form_get_by_id(varchar, json);