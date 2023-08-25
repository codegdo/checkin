CREATE OR REPLACE FUNCTION main_com.fn_get_form_field(input_form_id INT)
RETURNS TABLE (
  row_num BIGINT,
  field_id INT,
  field_type VARCHAR,
  field_data_type VARCHAR,
  field_name VARCHAR,
  field_title VARCHAR,
  field_description TEXT,
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
DECLARE
  var_id INT;
  var_lookup VARCHAR;
  var_is_dependent BOOLEAN;
  var_lookup_data JSONB;
  var_row_max INT;
  var_row_min INT := 1;

BEGIN

  DROP TABLE IF EXISTS temp_form_field CASCADE;
  CREATE TEMP TABLE temp_form_field AS
  SELECT
    row_number() OVER () AS row_num,
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
    COALESCE(fld.default_translation, ff.translation) AS field_translation,
    COALESCE(fld.default_options, ff.options) AS field_options,
    COALESCE(ff.position, fld.id) AS field_position,
    ff.map_to_parent field_map_to_parent,
    fld.parent_id field_parent_id,
    fld.mapping field_mapping,
    fld.lookup field_lookup,
    fld.is_dependent field_is_dependent,
    fld.has_dependent field_has_dependent,
    COALESCE(fd.default_required, false) AS field_default_required,
    COALESCE(ff.is_required OR COALESCE(fd.default_required, false), false) AS field_is_required,
    ff.is_disabled field_is_disabled,
    ff.is_hidden field_is_hidden,
    ff.is_readonly field_is_readonly
  FROM
    main_com.form_field ff
    LEFT JOIN main_com.field fld ON ff.field_id = fld.id
    LEFT JOIN main_com.field_default fd ON fld.id = fd.field_id
  WHERE
    ff.form_id = input_form_id;

  DROP TABLE IF EXISTS temp_lookup CASCADE;
  CREATE TEMP TABLE temp_lookup AS
  SELECT
    row_number() OVER () AS row_num,
    tff.field_id,
    tff.field_lookup,
    tff.field_is_dependent
    --tff.value
  FROM temp_form_field tff
  WHERE tff.field_lookup <> 'null' 
  AND tff.field_is_dependent IS NOT TRUE;

  SELECT max(tl.row_num)
  INTO var_row_max
  FROM temp_lookup tl;

  WHILE var_row_max >= var_row_min
  LOOP

    WITH tl AS (
    SELECT *
    FROM temp_lookup tl
    WHERE tl.row_num = var_row_min
    ), lookup_value AS (
      SELECT * from fn_lookup_value((SELECT tl.field_lookup FROM tl)::TEXT)
    )
    UPDATE temp_form_field tff
    SET field_data = (SELECT json_agg(lv.*) FROM lookup_value lv)::json
    FROM tl
    WHERE tff.field_id = tl.field_id;

    RAISE NOTICE 'ROWMAX: %', var_row_max;

    var_row_min := var_row_min + 1;
  END LOOP;

  --RAISE NOTICE 'LOOKUP: %', (SELECT json_agg(tl.*) FROM temp_lookup tl)::json;

  RETURN QUERY
  SELECT * FROM temp_form_field;

END;
$$ LANGUAGE plpgsql;

select * from main_com.fn_get_form_field(1);

select * from main_dbo.object;