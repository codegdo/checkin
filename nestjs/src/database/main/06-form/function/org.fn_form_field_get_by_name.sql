-- CREATE FUNCTION FN_FORM_FIELD_GET
CREATE OR REPLACE FUNCTION org.fn_form_field_get_by_name(p_name varchar)
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
BEGIN
  RETURN QUERY
  SELECT
  f.id,
  f.name,
  f.label,
  f.data,

  fld.id,
  fld.name,
  ff.label,
  ff.description,
  fld.type,
  fld.role,
  fld.data,
  fld.value,
  fld.map,
  fld.lookup,
  ff.position,
  ff.parent_id,
  --is_required
  CASE WHEN fld.is_required = true 
    THEN true 
  ELSE 
    CASE WHEN ff.is_required = true 
      THEN true 
    ELSE 
      false 
    END 
  END AS is_required
  --
  FROM org.form f
  INNER JOIN org.form_field ff ON ff.form_id = f.id
  LEFT JOIN org.field fld ON fld.id = ff.field_id
  WHERE f.name = p_name
  ORDER BY ff.position;
END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_form_field_get_by_name('auth_signup');

DROP FUNCTION IF EXISTS org.fn_form_field_get_by_name;
