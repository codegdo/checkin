CREATE PROCEDURE IF NOT EXISTS org.pr_form_get_for_user(
  p_form_id varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    max_id int;
    min_id int := 1;
  BEGIN

    DROP TABLE IF EXISTS tmp_user CASCADE;
    CREATE  TEMP TABLE tmp_user AS
    SELECT  *
    FROM    sec.user
    WHERE   id = p_user_id;

    DROP TABLE IF EXISTS tmp_contact CASCADE;
    CREATE  TEMP TABLE tmp_contact AS
    SELECT  *
    FROM    org.contact
    WHERE   id = (SELECT contact_id FROM tmp_user)

    DROP TABLE IF EXISTS tmp_form_field CASCADE;
    CREATE  TEMP TABLE tmp_form_field AS
    SELECT  *
    FROM    org.fn_form_field_get_by_id(p_form_id);
  
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