-- CREATE FUNCTION FN_GET_FIELD
CREATE OR REPLACE FUNCTION org.fn_get_field(
  p_form_id int,
  p_login_id int,
  p_org_id int
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
  field_parent_id varchar,
  field_is_required boolean,
  field_has_dependent boolean,
  field_is_dependent boolean
)
AS
$BODY$
  DECLARE
    rec_id int;
    rec_lookup varchar;
    rec_is_dependent boolean;

    lookup_data jsonb;

    row_max int;
    row_min int := 1;
  BEGIN

    DROP TABLE IF EXISTS FGF_form_field CASCADE;
    CREATE TEMP TABLE FGF_form_field AS
    SELECT
      row_number() over () as row_num,
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
      END AS fld_is_required,
      --
      fld.has_dependent fld_has_dependent,
      fld.is_dependent fld_is_dependent
    FROM org.form f
    INNER JOIN org.form_field ff ON ff.form_id = f.id
    LEFT JOIN org.field fld ON fld.id = ff.field_id
    WHERE f.id = p_form_id
    ORDER BY ff.position;

    DROP TABLE IF EXISTS FGF_lookup CASCADE;
    CREATE TEMP TABLE FGF_lookup AS
    SELECT
      row_number() over () as row_num,
      ff.fld_id,
      ff.fld_lookup,
      ff.fld_is_dependent
      --ff.value
    FROM FGF_form_field ff
    WHERE ff.fld_lookup IS NOT NULL;

    SELECT max(l.row_num)
    INTO row_max
    FROM FGF_lookup l;

    WHILE row_max >= row_min
    LOOP
      SELECT l.fld_id, l.fld_lookup, l.fld_is_dependent
      INTO rec_id, rec_lookup, rec_is_dependent
      FROM FGF_lookup l
      WHERE l.row_num = row_min;

      --CASE LOOKUP
      IF rec_is_dependent is TRUE THEN
        SELECT dbo.fn_lookup_get_value(rec_lookup, p_login_id, p_org_id) INTO lookup_data;
      ELSE
        SELECT dbo.fn_lookup_get_value(rec_lookup, p_login_id, p_org_id) INTO lookup_data;
      END IF;

      UPDATE FGF_form_field ff
      SET fld_data = lookup_data
      WHERE ff.fld_id = rec_id;

      row_min := row_min + 1;
    END LOOP;

    RETURN QUERY
      SELECT * FROM FGF_form_field;

  END;
$BODY$
LANGUAGE plpgsql;

--SELECT * FROM org.fn_get_field('1', 1, 1, 1);
