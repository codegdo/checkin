CREATE OR REPLACE PROCEDURE org.pr_form_field_get_by_name(
  p_name varchar,
  OUT data jsonb
)
AS
$fn$
  DECLARE
    _field_id int;
    _field_lookup varchar;
    _lookup_data jsonb;
    _field_data jsonb;
    _max int;
    _min int := 1;
  BEGIN
    DROP TABLE IF EXISTS tmp_form_field CASCADE;
    CREATE TEMP TABLE tmp_form_field AS
    SELECT
    f.id as form_id,
    f.name as form_name,
    f.label as form_label,
    fld.id as field_id,
    fld.name as field_name,
    ff.label as field_label,
    ff.description as field_description,
    fld.type as field_type,
    fld.role as field_role,
    fld.data as field_data,
    fld.map as field_map,
    fld.lookup as field_lookup
    --CASE WHEN f.name = 'login' THEN 1 ELSE 0 END AS test
    FROM org.form f
    INNER JOIN org.form_field ff ON ff.form_id = f.id
    INNER JOIN org.field fld ON fld.id = ff.field_id
    WHERE f.name = p_name;

    DROP TABLE IF EXISTS tmp_lookup CASCADE;
    CREATE TEMP TABLE tmp_lookup AS
    SELECT
      row_number() over () as id,
      tff.field_id,
      tff.field_lookup
    FROM tmp_form_field tff
    WHERE tff.field_lookup IS NOT NULL;

    SELECT max(id)
    INTO _max
    FROM tmp_lookup;

    WHILE _max >= _min
    LOOP
      SELECT tl.field_id, tl.field_lookup
      INTO _field_id, _field_lookup
      FROM tmp_lookup tl
      WHERE tl.id = _min;

      SELECT dbo.fn_lookup_get_value(_field_lookup) INTO _lookup_data;

      UPDATE tmp_form_field tff
      SET field_data = _lookup_data
      WHERE _field_id = tff.field_id;

      _min := _min + 1;
    END LOOP;

    SELECT json_agg(field)::jsonb
    INTO _field_data
    FROM(
        SELECT
        field_id id,
        field_name name,
        field_label label,
        field_description description,
        field_type type,
        field_role role,
        field_data data,
        field_lookup lookup,
        field_map map
        FROM tmp_form_field
    ) field;

    SELECT json_agg(form)::jsonb
    INTO data
    FROM(
        SELECT DISTINCT
        form_id id,
        form_name name,
        form_label label,
        _field_data fields
        FROM tmp_form_field
    ) form;

  END;
$fn$
LANGUAGE plpgsql;

CALL org.pr_form_field_get_by_name('signup', null);