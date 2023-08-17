CREATE OR REPLACE FUNCTION main_com.fn_get_form_type_field(p_form_type_id INT)
RETURNS TABLE (
  field_id INT,
  field_name VARCHAR,
  field_label VARCHAR,
  field_description TEXT,
  field_hint VARCHAR,
  field_placeholder VARCHAR,
  field_default_value VARCHAR,
  field_min INT,
  field_max INT,
  field_pattern VARCHAR,
  field_accessibility JSON,
  field_validation JSON,
  field_translation JSON,
  field_type VARCHAR,
  field_data_type VARCHAR,
  field_mapping VARCHAR,
  field_lookup VARCHAR,
  field_default_required BOOLEAN,
  field_is_required BOOLEAN
) AS $$
BEGIN

  DROP TABLE IF EXISTS temp_form_type_field CASCADE;
  CREATE TEMP TABLE temp_form_type_field AS
  SELECT
    f.id field_id,
    f.name field_name,
    COALESCE(ff.label,
      CASE
        WHEN f.name ~ E'^[a-z]' THEN
          fn_camel_case_split(f.name)
        ELSE
          f.name
      END
    ) AS field_label,
    ff.description field_description,
    ff.hint field_hint,
    ff.placeholder field_placeholder,
    ff.default_value field_default_value,
    ff.min field_min,
    ff.max field_max,
    ff.pattern field_pattern,
    ff.accessibility field_accessibility,
    ff.validation field_validation,
    ff.translation field_translation,
    f.type field_type,
    f.data_type field_data_type,
    f.mapping field_mapping,
    f.lookup field_lookup,
    COALESCE(fd.default_required, false) AS field_default_required,
    COALESCE(ff.is_required OR COALESCE(fd.default_required, false), false) AS field_is_required
  FROM
    main_dbo.form_type ft
    JOIN main_dbo.form_type_object fto ON ft.id = fto.form_type_id
    JOIN main_com.field f ON fto.object_id = f.object_id
    LEFT JOIN main_com.field_default fd ON f.id = fd.field_id
    LEFT JOIN main_com.form_field ff ON f.id = ff.field_id
  WHERE
    ft.id = p_form_type_id;

  RETURN QUERY
  SELECT * FROM temp_form_type_field;

END;
$$ LANGUAGE plpgsql;

select * from main_com.fn_get_form_type_field(1);