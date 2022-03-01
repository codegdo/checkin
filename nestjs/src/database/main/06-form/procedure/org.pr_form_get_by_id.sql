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

CALL org.pr_form_get_by_id('auth_signup', null);

DROP PROCEDURE IF EXISTS org.pr_form_get_by_id(varchar, json);

