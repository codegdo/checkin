CREATE OR REPLACE FUNCTION main_com.fn_get_form_type_field(input_form_type_id INT)
RETURNS TABLE (
  field_id INT,
  field_type VARCHAR,
  field_data_type VARCHAR,
  field_name VARCHAR,
  field_title VARCHAR,
  field_description TEXT,
  field_hint VARCHAR,
  field_placeholder VARCHAR,
  field_data JSON,
  field_value VARCHAR,
  field_default_value VARCHAR,
  field_length INT,
  field_min INT,
  field_max INT,
  field_pattern VARCHAR,
  field_accessibility JSON,
  field_validation JSON,
  field_translation JSON,
  field_position INT,
  field_map_to_parent VARCHAR,
  field_mapping VARCHAR,
  field_lookup VARCHAR,
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
    ff.hint field_hint,
    ff.placeholder field_placeholder,
    fld.data field_data,
    fld.value field_value,
    ff.default_value field_default_value,
    fld.length field_length,
    ff.min field_min,
    ff.max field_max,
    ff.pattern field_pattern,
    ff.accessibility field_accessibility,
    ff.validation field_validation,
    COALESCE(fld.default_translation, ff.translation) AS field_translation,
    ff.position field_position,
    ff.map_to_parent field_map_to_parent,
    fld.mapping field_mapping,
    fld.lookup field_lookup,
    COALESCE(fd.default_required, false) AS field_default_required,
    COALESCE(ff.is_required OR COALESCE(fd.default_required, false), false) AS field_is_required,
    ff.is_disabled field_is_disabled,
    ff.is_hidden field_is_hidden,
    ff.is_readonly field_is_readonly
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

select * from main_com.fn_get_form_type_field(1);
