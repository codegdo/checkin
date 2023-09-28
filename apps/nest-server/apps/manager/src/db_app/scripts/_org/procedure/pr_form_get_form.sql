CREATE OR REPLACE PROCEDURE _org.pr_form_get_form(
  IN input_form_id INT,
  OUT data json
) AS $$
DECLARE
BEGIN
  -- Fetch form data
  WITH form AS (
    SELECT *
    FROM _org.fn_get_form(input_form_id::VARCHAR)
  ), form_type_field AS (
    -- Fetch form_type_field data
    SELECT
    field_id "id",
    field_name "name",
    field_type "type",
    field_data_type "dataType",
    field_title "title",
    field_description "description",
    field_hint "hint",
    field_placeholder "placeholder",
    field_length "length",
    field_min "min",
    field_max "max",
    field_pattern "pattern",
    field_accessibility "accessibility",
    field_validation "validation",
    field_translation "translation",
    field_options "options",
    field_lookup "lookup",
    field_mapping "mapping",
    field_position "position",
    field_parent_id "parentId",
    field_map_to_parent "mapTopParent",
    field_default_value "defaultValue",
    field_default_required "defaultRequired",
    field_is_required "isRequired",
    field_is_disabled "isDisabled",
    field_is_hidden "isHidden",
    field_is_readonly "isReadonly"
    FROM _org.fn_get_form_field((SELECT form_id FROM form))
  )
  SELECT json_agg(form_data)::jsonb
  INTO data
  FROM (
    SELECT
    form_id "id",
    form_title "title",
    form_description "description",
    form_data "data",
    (
      SELECT json_agg(ff.*)
      FROM form_field AS ff
    ) "fields"
    FROM form
  ) form_data;
END;
$$ LANGUAGE plpgsql;