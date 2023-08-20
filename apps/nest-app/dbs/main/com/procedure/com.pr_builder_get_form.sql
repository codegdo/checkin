CREATE OR REPLACE PROCEDURE main_com.pr_builder_get_form(
  IN input_form_id INT,
  OUT data json
) AS $$
DECLARE
BEGIN
  -- Fetch form data
  WITH form AS (
    SELECT *
    FROM main_com.form
    WHERE id = input_form_id
  ), form_type_field AS (
    -- Fetch form_type_field data
    SELECT *
    FROM main_com.fn_get_form_type_field((SELECT form_type_id FROM form))
  ), form_field AS (
    -- Fetch form_field data
    SELECT *
    FROM form_type_field AS ftf
    JOIN main_com.form_field AS ff ON ftf.field_id = ff.field_id
    WHERE ff.form_id = input_form_id
  )
  SELECT json_agg(form_data)::jsonb
  INTO data
  FROM (
    SELECT *,
    (
      SELECT json_agg(ftf.*)
      FROM form_type_field AS ftf
    ) AS fields,
    (
      SELECT json_agg(ff.*)
      FROM form_field AS ff
    ) AS form_fields
    FROM form
  ) form_data;
END;
$$ LANGUAGE plpgsql;

-- Common Table Expressions cte
CREATE OR REPLACE PROCEDURE main_com.pr_builder_get_form(
  IN input_form_id INT,
  OUT data json
) AS $$
DECLARE
  var_form_type_field jsonb;
  var_form_field jsonb;
BEGIN
  -- Fetch form_type_field data
  WITH form_type_field_cte AS (
    SELECT json_agg(ftf)::jsonb
    FROM main_com.fn_get_form_type_field(input_form_id) AS ftf
  )
  SELECT json_agg(form_type_field_cte)::jsonb
  INTO var_form_type_field
  FROM form_type_field_cte;

  -- Fetch form_field data
  WITH form_field_cte AS (
    SELECT json_agg(ff)::jsonb
    FROM main_com.fn_get_form_type_field(input_form_id) AS ftf
    JOIN main_com.form_field AS ff ON ftf.field_id = ff.field_id
    WHERE ff.form_id = input_form_id
  )
  SELECT json_agg(form_field_cte)::jsonb
  INTO var_form_field
  FROM form_field_cte;

  -- Fetch form data
  WITH form_data_cte AS (
    SELECT *, var_form_field as form_fields, var_form_type_field as fields 
    FROM main_com.form
    WHERE id = input_form_id
  )
  SELECT json_agg(form_data_cte)::jsonb
  INTO data
  FROM form_data_cte;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE main_com.pr_builder_get_form(
  IN input_form_id INT,
  OUT data json
) AS $$
DECLARE
  var_form_type_field jsonb;
  var_form_field jsonb;
BEGIN
  -- Fetch form_type_field data
  SELECT json_agg(ftf)::jsonb
  INTO var_form_type_field
  FROM main_com.fn_get_form_type_field(input_form_id) AS ftf;

  -- Fetch form_field data
  SELECT json_agg(ff)::jsonb
  INTO var_form_field
  FROM main_com.fn_get_form_type_field(input_form_id) AS ftf
  JOIN main_com.form_field AS ff ON ftf.field_id = ff.field_id
  WHERE ff.form_id = input_form_id;

  -- Fetch form data
  SELECT json_agg(form)::jsonb
  INTO data
  FROM (
    SELECT *, var_form_field as form_fields, var_form_type_field as fields 
    FROM main_com.form
    WHERE id = input_form_id
  ) form;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE main_com.pr_builder_get_form(
  IN input_form_id INT,
  --IN input_login_id INT,
  OUT data json
) AS $$
DECLARE
  --
  var_form_type_field jsonb;
  var_form_field jsonb;
  var_user jsonb;
BEGIN

  SELECT json_agg(form_type_field)::jsonb
  INTO var_form_type_field
  FROM (
    SELECT *
    FROM main_com.fn_get_form_type_field(1)
  ) form_type_field;

  SELECT json_agg(form_field)::jsonb
  INTO var_form_field
  FROM (
    SELECT *
    FROM main_com.fn_get_form_type_field(1) ftf
      JOIN(
        SELECT field_id 
        FROM main_com.form_field 
        WHERE form_id = 1
      ) ff ON ftf.field_id = ff.field_id
  ) form_field;

  --raise notice 'FORM_TYPE_FIELD: %', var_form_type_field;

  SELECT json_agg(d)::json ->> 0
  INTO data
  FROM (
    SELECT * FROM main_com.form
    WHERE id = input_form_id
  ) d;

  --select *, (SELECT json_agg(form_field.*) from main_com.form_field) as fields
  --from main_com.form
  --where id = 1;

  COMMIT;
  --raise notice 'Value: %', p_form_data::jsonb ->> 'firstName';
  --WITH c AS (), u AS () SELECT json_agg(d)::json ->> 0 INTO data FROM () d;

  --EXCEPTION WHEN SQLSTATE '23505' THEN
  --raise notice 'ERROR %', SQLERRM;
  --raise exception '% %', SQLERRM, SQLSTATE;
END;
$$ LANGUAGE plpgsql;

CALL main_com.pr_builder_get_form('1', null);

select * from main_com.fn_get_form_type_field(1) ftf
join(
    select field_id from main_com.form_field ff where ff.form_id = 1
) ff on ftf.field_id = ff.field_id;