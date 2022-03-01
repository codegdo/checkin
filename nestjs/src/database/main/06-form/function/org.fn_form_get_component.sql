-- CREATE FUNCTION FN_FORM_GET_COMPONENT
CREATE OR REPLACE FUNCTION org.fn_form_get_component(
  p_form_id varchar,
  p_user_id int,
  p_biz_id int
)
RETURNS TABLE(
  row_num bigint,
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
      row_number() over () as row_num,
      f.id f_id,
      f.name f_name,
      f.label f_label,
      f.data f_data,

      fld.id fld_id,
      fld.name fld_name,
      fc.label fld_label,
      fc.description fld_description,
      fld.type fld_type,
      fld.role fld_role,
      fld.data fld_data,
      fld.value fld_value,
      fld.map fld_map,
      fld.lookup fld_lookup,
      fc.position fld_position,
      fc.parent_id fld_parent_id, --int
      --is_required
      CASE WHEN fld.is_required = true
        THEN true
      ELSE
        CASE WHEN fc.is_required = true
          THEN true
        ELSE
          false
        END
      END AS fld_is_required
    --
    FROM org.form f
    INNER JOIN org.form_component fc ON fc.form_id = f.id
    LEFT JOIN org.field fld ON fld.id = fc.field_id
    WHERE f.id = _id OR f.name = _name
    ORDER BY fc.position;

    DROP TABLE IF EXISTS FGC_lookup CASCADE;
    CREATE TEMP TABLE FGC_lookup AS
    SELECT
      row_number() over () as row_num,
      ff.fld_id,
      ff.fld_lookup
      --tff.has_dependent
    FROM FGC_form_field ff
    WHERE ff.fld_lookup IS NOT NULL;

    SELECT max(l.row_num)
    INTO max_id
    FROM FGC_lookup l;

    WHILE max_id >= min_id
    LOOP
      SELECT l.fld_id, l.fld_lookup
      INTO form_field_id, form_field_lookup
      FROM FGC_lookup l
      WHERE l.row_num = min_id;

      SELECT dbo.fn_lookup_get_value(form_field_lookup, p_user_id, p_biz_id) INTO lookup_data;

      UPDATE FGC_form_field ff
      SET fld_data = lookup_data
      WHERE form_field_id = ff.fld_id;

      min_id := min_id + 1;
    END LOOP;

    RETURN QUERY
      SELECT * FROM FGC_form_field;

  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_form_get_component('user_add', 1, 1);

DROP FUNCTION IF EXISTS org.fn_form_get_component;
