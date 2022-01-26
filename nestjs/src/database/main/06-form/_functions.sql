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
  INNER JOIN org.field fld ON fld.id = ff.field_id
  WHERE f.name = p_name
  ORDER BY ff.position;
END;
$BODY$
LANGUAGE plpgsql;

-- CREATE PROCEDURE PR_FORM_FIELD_GET_BY_NAME
CREATE OR REPLACE PROCEDURE org.pr_form_get_by_name(
  p_name varchar,
  OUT data jsonb
)
AS
$BODY$
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
    SELECT * FROM org.fn_form_field_get(p_name);

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
      field_value value,
      field_lookup lookup,
      field_map map,
      field_position position,
      field_parent_id "parentId",
      field_is_required "isRequired"
      FROM tmp_form_field
    ) field;

    SELECT json_agg(form)::jsonb
    INTO data
    FROM(
      SELECT DISTINCT
      form_id id,
      form_name name,
      form_label label,
      form_data data,
      _field_data fields
      FROM tmp_form_field
    ) form;

  END;
$BODY$
LANGUAGE plpgsql;



-- CALL FUNCTIONS

SELECT * FROM org.fn_form_field_get('signup');
CALL org.pr_form_get_by_name('signup', null);

-- END
-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
org.fn_form_field_get;
DROP PROCEDURE IF EXISTS
org.pr_form_get_by_name;

-- END