CREATE OR REPLACE FUNCTION main_com.fn_get_form_type_field(input_form_type_id INT)
RETURNS TABLE (
  field_id INT,
  field_type VARCHAR,
  field_data_type VARCHAR,
  field_name VARCHAR,
  field_title VARCHAR,
  field_description VARCHAR,
  field_data JSON,
  field_data_value JSON,
  field_value VARCHAR,
  field_default_value VARCHAR,
  field_length INT,
  field_accessibility JSON,
  field_validation JSON,
  field_translation JSON,
  field_options JSON,
  field_position INT,
  field_map_to_parent VARCHAR,
  field_parent_id INT,
  field_mapping VARCHAR,
  field_lookup VARCHAR,
  field_is_dependent BOOLEAN,
  field_has_dependent BOOLEAN,
  field_default_required BOOLEAN,
  field_is_required BOOLEAN,
  field_is_disabled BOOLEAN,
  field_is_hidden BOOLEAN,
  field_is_readonly BOOLEAN
) AS $$
BEGIN

  DROP TABLE IF EXISTS temp_form_type_field CASCADE;
  CREATE TEMP TABLE temp_form_type_field AS
  SELECT
    fld.id field_id,
    fld.type field_type,
    fld.data_type field_data_type,
    fld.name field_name,
    COALESCE(ff.title,
      CASE
        WHEN fld.name ~ E'^[a-z]' THEN
          fn_camel_case_split(fld.name)
        ELSE
          fld.name
      END
    ) AS field_title,
    ff.description field_description,
    fld.data field_data,
    fld.data_value field_data_value,
    fld.value field_value,
    ff.default_value field_default_value,
    fld.length field_length,
    ff.accessibility field_accessibility,
    ff.validation field_validation,
    COALESCE(ff.translation, fld.default_translation) AS field_translation,
    COALESCE(ff.options, fld.default_options) AS field_options,
    COALESCE(ff.position, fld.id) AS field_position,
    ff.map_to_parent field_map_to_parent,
    fld.parent_id field_parent_id,
    fld.mapping field_mapping,
    fld.lookup field_lookup,
    COALESCE(fld.is_dependent, false) AS field_is_dependent,
    COALESCE(fld.has_dependent, false) AS field_has_dependent,
    COALESCE(fd.default_required, false) AS field_default_required,
    COALESCE(ff.is_required OR COALESCE(fd.default_required, false), false) AS field_is_required,
    COALESCE(ff.is_disabled, false) AS field_is_disabled,
    COALESCE(ff.is_hidden, false) AS field_is_hidden,
    COALESCE(ff.is_readonly, false) AS field_is_readonly
  FROM
    main_dbo.form_type ft
    JOIN main_dbo.form_type_object fto ON ft.id = fto.form_type_id
    JOIN main_com.field fld ON fto.object_id = fld.object_id
    LEFT JOIN main_com.field_default fd ON fld.id = fd.field_id
    LEFT JOIN main_com.form_field ff ON fld.id = ff.field_id
  WHERE
    ft.id = input_form_type_id;

  RETURN QUERY
  SELECT * FROM temp_form_type_field;

END;
$$ LANGUAGE plpgsql;

SELECT * FROM main_com.fn_get_form_type_field(1);
