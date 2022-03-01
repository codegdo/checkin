-- CREATE FUNCTION FN_FORM_GET_FIELD
CREATE OR REPLACE FUNCTION org.fn_form_get_field(
  p_form_id varchar,
  p_filter_id int,
  p_login_id int,
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
  field_parent_id varchar,
  field_is_required boolean,
  field_has_dependent boolean,
  field_is_dependent boolean
)
AS
$BODY$
  DECLARE
    filter_id int := 0;
    filter_name varchar := '';

    rec_id int;
    rec_lookup varchar;
    rec_is_dependent boolean;

    lookup_data jsonb;

    row_max int;
    row_min int := 1;
  BEGIN

    IF (SELECT p_form_id ~ '^\d+$') THEN
      filter_id := p_form_id::int;
    ELSE
      filter_name := p_form_id::varchar;
    END IF;

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
    WHERE f.id = filter_id OR f.name = filter_name
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
        SELECT dbo.fn_lookup_get_value(rec_lookup, null, p_login_id, p_biz_id) INTO lookup_data;
      ELSE
        SELECT dbo.fn_lookup_get_value(rec_lookup, null, p_login_id, p_biz_id) INTO lookup_data;
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

-- CREATE FUNCTION FN_FORM_GET_FIELD_COMPONENT
CREATE OR REPLACE FUNCTION org.fn_form_get_field_component(
  p_form_id varchar,
  p_filter_id int,
  p_login_id int,
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
  field_is_required boolean,
  field_has_dependent boolean,
  field_is_dependent boolean
)
AS
$BODY$
  DECLARE
    filter_id int := 0;
    filter_name varchar := '';

    rec_id int;
    rec_lookup varchar;
    rec_is_dependent boolean;

    lookup_data jsonb;

    row_max int;
    row_min int := 1;
  BEGIN

    IF (SELECT p_form_id ~ '^\d+$') THEN
      filter_id := p_form_id::int;
    ELSE
      filter_name := p_form_id::varchar;
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
      END AS fld_is_required,
      --
      fld.has_dependent fld_has_dependent,
      fld.is_dependent fld_is_dependent
    FROM org.form f
    INNER JOIN org.form_component fc ON fc.form_id = f.id
    LEFT JOIN org.field fld ON fld.id = fc.field_id
    WHERE f.id = filter_id OR f.name = filter_name
    ORDER BY fc.position;

    DROP TABLE IF EXISTS FGC_lookup CASCADE;
    CREATE TEMP TABLE FGC_lookup AS
    SELECT
      row_number() over () as row_num,
      ff.fld_id,
      ff.fld_lookup,
      ff.fld_has_dependent
      --ff.value
    FROM FGC_form_field ff
    WHERE ff.fld_lookup IS NOT NULL;

    SELECT max(l.row_num)
    INTO row_max
    FROM FGC_lookup l;

    WHILE row_max >= row_min
    LOOP
      SELECT l.fld_id, l.fld_lookup
      INTO rec_id, rec_lookup, rec_is_dependent
      FROM FGC_lookup l
      WHERE l.row_num = row_min;

      --CASE LOOKUP
      IF rec_is_dependent is TRUE THEN
        SELECT dbo.fn_lookup_get_value(rec_lookup, null, p_login_id, p_biz_id) INTO lookup_data;
      ELSE
        SELECT dbo.fn_lookup_get_value(rec_lookup, null, p_login_id, p_biz_id) INTO lookup_data;
      END IF;

      UPDATE FGC_form_field ff
      SET fld_data = lookup_data
      WHERE ff.fld_id = rec_id;

      row_min := row_min + 1;
    END LOOP;

    RETURN QUERY
      SELECT * FROM FGC_form_field;

  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION FN_FORM_GET_DATA_FOR_USER
CREATE OR REPLACE FUNCTION org.fn_form_get_data_for_user(
  p_form_id varchar,
  p_filter_id int,
  p_login_id int,
  p_biz_id int
)
RETURNS TABLE(
  id int,
  value text
) AS
$BODY$
  DECLARE
    user_form_id varchar;
    user_contact_id int;
    user_group_id int;

    user_data json;
    contact_data json;
    group_data json;
    policy_data json;

    eval_id int;
    eval_value text;

    map text;
    map_table text;
    map_column text;

    row_max int;
    row_min int := 1;
  BEGIN
    DROP TABLE IF EXISTS FGDFU_eval CASCADE;
    CREATE TEMP TABLE FGDFU_eval(id int, value text);

    SELECT json_agg(data.*)::json ->> 0
    INTO user_data
    FROM (
      SELECT *
      FROM sec.user u
      WHERE u.id = p_filter_id
    ) data;

    --SET
    SELECT user_data ->> 'contact_id' INTO user_contact_id;
    SELECT user_data ->> 'group_id' INTO user_group_id;
    SELECT user_data ->> 'form_id' INTO user_form_id;

    SELECT json_agg(data.*)::json ->> 0
    INTO contact_data
    FROM (
      SELECT *
      FROM org.contact c
      WHERE c.id = user_contact_id
    ) data;

    SELECT json_agg(data.*)::json ->> 0
    INTO group_data
    FROM (
      SELECT *
      FROM sec.group g
      WHERE g.id = user_group_id
    ) data;

    --REPLACE
    IF user_form_id IS NULL THEN
      user_form_id := p_form_id;
    END IF;

    DROP TABLE IF EXISTS FGDFU_form_field CASCADE;
    CREATE TEMP TABLE FGDFU_form_field AS
    SELECT
      row_number() over () as row_num, *
    FROM (
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_form_get_field(user_form_id, null, p_login_id, p_biz_id)
      UNION
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_form_get_field_component(user_form_id, null, p_login_id, p_biz_id)
    ) ff;

    SELECT max(ff.row_num)
    INTO row_max
    FROM FGDFU_form_field ff;

    WHILE row_max >= row_min
    LOOP

      SELECT field_id, field_map
      INTO eval_id, map
      FROM FGDFU_form_field ff
      WHERE ff.row_num = row_min;

      map_table := split_part(map, '.', 2);
      map_column := split_part(map, '.', 3);

      CASE map_table
        WHEN 'user' THEN
          SELECT user_data ->> map_column INTO eval_value;
        WHEN 'contact' THEN
          SELECT contact_data ->> map_column INTO eval_value;
         WHEN 'group' THEN
          SELECT group_data ->> map_column INTO eval_value;
        ELSE
          eval_value := null;
      END CASE;

      INSERT INTO FGDFU_eval(id, value)
      VALUES (eval_id, eval_value);

      row_min := row_min + 1;
    END LOOP;

    --RAISE NOTICE 'USER DATA %', user_data;

    RETURN QUERY
    SELECT *
    FROM FGDFU_eval;

  END;
$BODY$
LANGUAGE plpgsql;

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
org.fn_form_get_field;

DROP FUNCTION IF EXISTS
org.fn_form_get_field_component;

DROP FUNCTION IF EXISTS
org.fn_form_get_data_for_user;
