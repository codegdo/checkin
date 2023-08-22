CREATE OR REPLACE FUNCTION main_com.fn_get_form(input_form_id VARCHAR)
RETURNS TABLE (
  form_id INT,
  form_type_id INT,
  form_name VARCHAR,
  form_title VARCHAR,
  form_description TEXT,
  form_data jsonb,
  form_is_active BOOLEAN,
  form_is_published BOOLEAN
) AS $$
BEGIN

  RETURN QUERY
  SELECT
  f.id form_id,
  f.form_type_id,
  ft.name form_name,
  f.title form_title,
  f.description form_description,
  f.data form_data,
  f.is_active form_is_active,
  f.is_published form_is_published
  FROM main_com.form f
  LEFT JOIN main_dbo.form_type ft ON f.form_type_id = ft.id
  WHERE (
    CASE
      WHEN (input_form_id ~ '^\d+$') THEN
        f.id = CAST(input_form_id AS INT)
      ELSE
        ft.name = input_form_id
    END
  )
  AND f.is_active IS true
  AND f.is_published IS true;

END;
$$ LANGUAGE plpgsql;

select * from main_com.fn_get_form('auth_signup')