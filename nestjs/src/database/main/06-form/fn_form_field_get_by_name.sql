-- CREATE TYPE FORM_FIELD_RETURN_TYPE
CREATE TYPE form_field_return_type AS (
  form_id int,
  form_name varchar,
  form_label varchar,
  field_id int,
  field_name varchar,
  field_label varchar,
  field_data jsonb,
  field_map varchar,
  field_lookup varchar
  --test int
);

CREATE OR REPLACE FUNCTION fn_form_field_get_by_name(p_name varchar)
RETURNS TABLE(
  form_id int,
  form_name varchar,
  form_label varchar,
  field_id int,
  field_name varchar,
  field_label varchar,
  field_data jsonb,
  field_map varchar,
  field_lookup varchar
)
AS
$$
DECLARE
    _field_id int;
    _field_lookup varchar;
    _lookup_data jsonb;
    _max int;
    _min int := 1;
BEGIN
    --DROP TABLE IF EXISTS tmp_dropdown_data CASCADE;
    --CREATE TABLE tmp_dropdown_data(key varchar(255), value varchar(255));

    DROP TABLE IF EXISTS tmp_form_field CASCADE;
    CREATE TEMP TABLE tmp_form_field AS
    SELECT
    f.id as form_id,
    f.name as form_name,
    f.label as form_label,
    fld.id as field_id,
    fld.name as field_name,
    ff.label as field_label,
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

    WHILE _max >= _min LOOP
      SELECT tl.field_id, tl.field_lookup
      INTO _field_id, _field_lookup
      FROM tmp_lookup tl
      WHERE l.id = _min;

      SELECT fn_get_lookup_value(_field_lookup) INTO _lookup_data;

      UPDATE tmp_form_field tff
      SET field_data = _lookup_data
      WHERE _field_id = tff.field_id;

      _min := _min + 1;
    END LOOP;

    RETURN QUERY
    SELECT * FROM tmp_form_field;
END;
$$
LANGUAGE plpgsql;


SELECT * FROM fn_form_field_get_by_name('signup');

DROP FUNCTION fn_form_field_get_by_name;
DROP TYPE form_field_return_type;