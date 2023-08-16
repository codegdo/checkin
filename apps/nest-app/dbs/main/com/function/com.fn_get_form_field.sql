CREATE OR REPLACE FUNCTION main_com.fn_get_form_field(p_form_id INT)
RETURNS TABLE (
  row_num BIGINT,
  field_id INT,
  field_name VARCHAR,
  field_type VARCHAR,
  field_data_type VARCHAR,
  field_mapping VARCHAR,
  field_lookup VARCHAR
) AS $$
DECLARE
  var_id INT;
  var_lookup VARCHAR;
  var_is_dependent BOOLEAN;
  var_row_max INT;
  var_row_min INT := 1;
  var_lookup_data JSONB;

BEGIN

  DROP TABLE IF EXISTS temp_form_field CASCADE;
  CREATE TEMP TABLE temp_form_field AS
  SELECT
    row_number() OVER () AS row_num,
    f.id field_id,
    f.name field_name,
    f.type field_type,
    f.data_type field_data_type,
    f.mapping field_mapping,
    f.lookup field_lookup
  FROM
    main_com.form f
    JOIN main_com.form_field ff ON f.id = ff.form_id
  WHERE
    ft.id = p_form_id;

  RETURN QUERY
  SELECT * FROM temp_form_field;

END;
$$ LANGUAGE plpgsql;

select * from main_com.fn_get_form_field(1);