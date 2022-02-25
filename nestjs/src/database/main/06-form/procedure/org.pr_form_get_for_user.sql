CREATE PROCEDURE IF NOT EXISTS org.pr_form_get_for_user(
  p_user_id int,
  p_form_id varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    max_id int;
    min_id int := 1;
  BEGIN

    DROP TABLE IF EXISTS tmp_form_field CASCADE;
    CREATE  TEMP TABLE tmp_form_field AS
    SELECT  *
    FROM    org.fn_form_get_field(p_form_id);

    DROP TABLE IF EXISTS tmp_component_field CASCADE;
    CREATE  TEMP TABLE tmp_component_field AS
    SELECT  *
    FROM    org.fn_form_get_component(p_form_id);

    

  END;
$BODY$
LANGUAGE plpgsql;