-- CREATE FUNCTION FN_FORM_GET_FIELD
CREATE OR REPLACE FUNCTION org.fn_form_get_field(p_form_id varchar)
RETURNS TABLE(
  form_id int,
  form_name varchar,
  form_label varchar,
  form_data jsonb,

  field_id int,
  field_name varchar,
  field_label varchar,
  field_description text,
  field_type varchar,
  field_role varchar,
  field_data jsonb,
  field_value varchar,
  field_map varchar,
  field_lookup varchar,
  field_position int,
  field_parent_id varchar,
  field_is_required boolean
)
AS
$BODY$
  DECLARE
    _id int := 0;
    _name varchar := '';

    form_field_id int;
    form_field_lookup varchar;

    lookup_data jsonb;

    max_id int;
    min_id int := 1;
  BEGIN

    IF (SELECT p_form_id ~ '^\d+$') THEN
      _id := p_form_id::int;
    ELSE
      _name := p_form_id::varchar;
    END IF;

    DROP TABLE IF EXISTS FGF_form_field CASCADE;
    CREATE TEMP TABLE FGF_form_field AS
    SELECT
      f.id f_id,
      f.name f_name,
      f.label f_label,
      f.data f_data,

      fld.id fld_id,
      fld.name fld_name,
      ff.label fld_label,
      ff.description fld_description,
      fld.type fld_type,
      fld.role fld_role,
      fld.data fld_data,
      fld.value fld_value,
      fld.map fld_map,
      fld.lookup fld_lookup,
      ff.position fld_position,
      ff.parent_id fld_parent_id, --varchar
      --is_required
      CASE WHEN fld.is_required = true
        THEN true
      ELSE
        CASE WHEN ff.is_required = true
          THEN true
        ELSE
          false
        END
      END AS fld_is_required
    --
    FROM org.form f
    INNER JOIN org.form_field ff ON ff.form_id = f.id
    LEFT JOIN org.field fld ON fld.id = ff.field_id
    WHERE f.id = _id OR f.name = _name
    ORDER BY ff.position;

    DROP TABLE IF EXISTS FGF_lookup CASCADE;
    CREATE TEMP TABLE FGF_lookup AS
    SELECT
      row_number() over () as id,
      tff.fld_id,
      tff.fld_lookup
      --tff.has_dependent
    FROM FGF_form_field tff
    WHERE tff.fld_lookup IS NOT NULL;

    SELECT max(id)
    INTO max_id
    FROM FGF_lookup;

    WHILE max_id >= min_id
    LOOP
      SELECT tl.fld_id, tl.fld_lookup
      INTO form_field_id, form_field_lookup
      FROM FGF_lookup tl
      WHERE tl.id = min_id;

      SELECT dbo.fn_lookup_get_value(form_field_lookup) INTO lookup_data;

      UPDATE FGF_form_field tff
      SET fld_data = lookup_data
      WHERE form_field_id = tff.fld_id;

      min_id := min_id + 1;
    END LOOP;

    RETURN QUERY
      SELECT * FROM FGF_form_field;

  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION FN_FORM_GET_COMPONENT
CREATE OR REPLACE FUNCTION org.fn_form_get_component(p_form_id varchar)
RETURNS TABLE(
  form_id int,
  form_name varchar,
  form_label varchar,
  form_data jsonb,

  field_id int,
  field_name varchar,
  field_label varchar,
  field_description text,
  field_type varchar,
  field_role varchar,
  field_data jsonb,
  field_value varchar,
  field_map varchar,
  field_lookup varchar,
  field_position int,
  field_parent_id int,
  field_is_required boolean
)
AS
$BODY$
  DECLARE
    _id int := 0;
    _name varchar := '';

    form_field_id int;
    form_field_lookup varchar;

    lookup_data jsonb;

    max_id int;
    min_id int := 1;
  BEGIN

    IF (SELECT p_form_id ~ '^\d+$') THEN
      _id := p_form_id::int;
    ELSE
      _name := p_form_id::varchar;
    END IF;

    DROP TABLE IF EXISTS FGC_form_field CASCADE;
    CREATE TEMP TABLE FGC_form_field AS
    SELECT
      f.id f_id,
      f.name f_name,
      f.label f_label,
      f.data f_data,

      fld.id fld_id,
      fld.name fld_name,
      cf.label fld_label,
      cf.description fld_description,
      fld.type fld_type,
      fld.role fld_role,
      fld.data fld_data,
      fld.value fld_value,
      fld.map fld_map,
      fld.lookup fld_lookup,
      cf.position fld_position,
      cf.parent_id fld_parent_id, --int
      --is_required
      CASE WHEN fld.is_required = true
        THEN true
      ELSE
        CASE WHEN cf.is_required = true
          THEN true
        ELSE
          false
        END
      END AS fld_is_required
    --
    FROM org.form f
    INNER JOIN org.component_field cf ON cf.form_id = f.id
    LEFT JOIN org.field fld ON fld.id = cf.field_id
    WHERE f.id = _id OR f.name = _name
    ORDER BY cf.position;

    DROP TABLE IF EXISTS FGC_lookup CASCADE;
    CREATE TEMP TABLE FGC_lookup AS
    SELECT
      row_number() over () as id,
      tff.fld_id,
      tff.fld_lookup
      --tff.has_dependent
    FROM FGC_form_field tff
    WHERE tff.fld_lookup IS NOT NULL;

    SELECT max(id)
    INTO max_id
    FROM FGC_lookup;

    WHILE max_id >= min_id
    LOOP
      SELECT tl.fld_id, tl.fld_lookup
      INTO form_field_id, form_field_lookup
      FROM FGC_lookup tl
      WHERE tl.id = min_id;

      SELECT dbo.fn_lookup_get_value(form_field_lookup) INTO lookup_data;

      UPDATE FGC_form_field tff
      SET fld_data = lookup_data
      WHERE form_field_id = tff.fld_id;

      min_id := min_id + 1;
    END LOOP;

    RETURN QUERY
      SELECT * FROM FGC_form_field;

  END;
$BODY$
LANGUAGE plpgsql;


-- CALL FUNCTIONS

SELECT * FROM org.fn_form_get_field('auth_signup');

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
org.fn_form_get_field;

DROP FUNCTION IF EXISTS
org.fn_form_get_component;
