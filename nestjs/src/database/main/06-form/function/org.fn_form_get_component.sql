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
  BEGIN

    IF (SELECT p_form_id ~ '^\d+$') THEN
      _id := p_form_id::int;
    ELSE
      _name := p_form_id::varchar;
    END IF;

    RETURN QUERY
      SELECT
        f.id,
        f.name,
        f.label,
        f.data,

        fld.id,
        fld.name,
        cf.label,
        cf.description,
        fld.type,
        fld.role,
        fld.data,
        fld.value,
        fld.map,
        fld.lookup,
        cf.position,
        cf.parent_id, --int
        --is_required
        CASE WHEN fld.is_required = true
          THEN true
        ELSE
          CASE WHEN cf.is_required = true
            THEN true
          ELSE
            false
          END
        END AS is_required
        --
      FROM org.form f
      INNER JOIN org.component_field cf ON cf.form_id = f.id
      LEFT JOIN org.field fld ON fld.id = cf.field_id
      WHERE f.id = _id OR f.name = _name
      ORDER BY cf.position;
  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_form_get_component('3');

DROP FUNCTION IF EXISTS org.fn_form_get_component;