CREATE OR REPLACE FUNCTION main_com.fn_get_field(p_form_type_id INT)
RETURNS TABLE (
  row_num BIGINT,
  field_id INT,
  field_name VARCHAR,
  field_label VARCHAR,
  field_description TEXT,
  field_type VARCHAR,
  field_data_type VARCHAR,
  field_mapping VARCHAR,
  field_lookup VARCHAR,
  field_default_required BOOLEAN,
  field_is_required BOOLEAN
) AS $$
DECLARE
  var_id INT;
  var_lookup VARCHAR;
  var_is_dependent BOOLEAN;
  var_row_max INT;
  var_row_min INT := 1;
  var_lookup_data JSONB;

BEGIN

  DROP TABLE IF EXISTS temp_field CASCADE;
  CREATE TEMP TABLE temp_field AS
  SELECT
    row_number() OVER () AS row_num,
    f.id field_id,
    f.name field_name,
    ff.label field_label,
    ff.description field_description,
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
  SELECT * FROM temp_field;

END;
$$ LANGUAGE plpgsql;

select * from main_com.fn_get_field(1);