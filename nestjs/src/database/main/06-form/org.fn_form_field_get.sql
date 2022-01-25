-- CREATE FUNCTION FN_FORM_FIELD_GET
CREATE OR REPLACE FUNCTION org.fn_form_field_get(p_name varchar)
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
  fld.map,
  fld.lookup,
  ff.position,
  ff.parent_id,
  ff.is_required
  --CASE WHEN f.name = 'login' THEN 1 ELSE 0 END AS test
  FROM org.form f
  INNER JOIN org.form_field ff ON ff.form_id = f.id
  INNER JOIN org.field fld ON fld.id = ff.field_id
  WHERE f.name = p_name
  ORDER BY ff.position;
END;
$BODY$
LANGUAGE plpgsql;



-- CALL FUNCTIONS

SELECT * FROM org.fn_form_field_get('signup');


-- END
-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
org.fn_form_field_get;

-- END