CREATE OR REPLACE PROCEDURE main_sec.pr_get_all_builder_forms(
  IN input_form_type_id INT,
  IN input_login_id INT,
  OUT data json
) AS $$
DECLARE
  --
  var_field_types jsonb;
  var_fields jsonb;
BEGIN
  
  COMMIT;
  --raise notice 'Value: %', p_form_data::jsonb ->> 'firstName';
  --WITH c AS (), u AS () SELECT json_agg(d)::json ->> 0 INTO data FROM () d;

  --EXCEPTION WHEN SQLSTATE '23505' THEN
  --raise notice 'ERROR %', SQLERRM;
  --raise exception '% %', SQLERRM, SQLSTATE;
END;
$$ LANGUAGE plpgsql;

