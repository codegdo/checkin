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

    DROP TABLE IF EXISTS tmp_lookup CASCADE;
    CREATE TEMP TABLE tmp_lookup AS
    SELECT
      row_number() over () as id,
      tff.field_id,
      tff.field_lookup,
      --tff.has_dependent
    FROM tmp_form_field tff
    WHERE tff.field_lookup IS NOT NULL;

    SELECT max(id)
    INTO max_id
    FROM tmp_lookup;

    WHILE max_id >= min_id
    LOOP
      SELECT tl.field_id, tl.field_lookup
      INTO form_field_id, form_field_lookup
      FROM tmp_lookup tl
      WHERE tl.id = min_id;

      SELECT dbo.fn_lookup_get_value(form_field_lookup) INTO lookup_data;

      UPDATE tmp_form_field tff
      SET field_data = lookup_data
      WHERE form_field_id = tff.field_id;

      min_id := min_id + 1;
    END LOOP;

  END;
$BODY$
LANGUAGE plpgsql;