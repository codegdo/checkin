-- CREATE PROCEDURE PR_FORM_FIELD_GET_BY_NAME
CREATE OR REPLACE PROCEDURE org.pr_form_get_by_name(
  p_name varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    form_field_id int;
    form_field_lookup varchar;
    form_field_data jsonb;
    lookup_data jsonb;

    max_id int;
    min_id int := 1;
  BEGIN
    DROP TABLE IF EXISTS tmp_form_field CASCADE;
    CREATE TEMP TABLE tmp_form_field AS
    SELECT * FROM org.fn_form_field_get_by_name(p_name);

    DROP TABLE IF EXISTS tmp_lookup CASCADE;
    CREATE TEMP TABLE tmp_lookup AS
    SELECT
      row_number() over () as id,
      tff.field_id,
      tff.field_lookup
    FROM tmp_form_field tff
    WHERE tff.field_lookup IS NOT NULL;

    SELECT max(id)
    INTO max_id
    FROM tmp_lookup;

    WHILE max_id >= min_id
    LOOP
      SELECT tl.field_id, tl.field_lookup
      INTO form_field_id, form_field_lookup
      FROM tmp_lookup tl
      WHERE tl.id = min_id;

      SELECT dbo.fn_lookup_get_value(form_field_lookup) INTO lookup_data;

      UPDATE tmp_form_field tff
      SET field_data = lookup_data
      WHERE form_field_id = tff.field_id;

      min_id := min_id + 1;
    END LOOP;

    SELECT json_agg(field)::jsonb
    INTO form_field_data
    FROM(
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
      FROM tmp_form_field
      ORDER BY field_position
    ) field;

    SELECT json_agg(form)::json
    INTO data
    FROM(
      SELECT DISTINCT
      form_id id,
      form_name name,
      form_label label,
      form_data data,
      form_field_data fields
      FROM tmp_form_field
    ) form;

  END;
$BODY$
LANGUAGE plpgsql;

CALL org.pr_form_get_by_name('auth_signup', null);

DROP PROCEDURE IF EXISTS org.pr_form_get_by_name;