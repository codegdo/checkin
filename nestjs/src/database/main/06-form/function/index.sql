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
        SELECT dbo.fn_get_lookup(
          rec_lookup, 
          p_login_id, 
          p_org_id
        ) 
        INTO lookup_data;
      ELSE
        SELECT dbo.fn_get_lookup(
          rec_lookup, 
          p_login_id, 
          p_org_id
        ) 
        INTO lookup_data;
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

-- CREATE FUNCTION FN_GET_FIELD_COMPONENT
CREATE OR REPLACE FUNCTION org.fn_get_field_component(
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
  field_parent_id int,
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
    WHERE f.id = p_form_id
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
        SELECT dbo.fn_get_lookup(
          rec_lookup, 
          p_login_id, 
          p_org_id
        ) 
        INTO lookup_data;
      ELSE
        SELECT dbo.fn_get_lookup(
          rec_lookup, 
          p_login_id, 
          p_org_id
        ) 
        INTO lookup_data;
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

-- CREATE FUNCTION FN_GET_DATA_USER
CREATE OR REPLACE FUNCTION org.fn_get_data_user(
  p_form_id int,
  p_filter_id int,
  p_login_id int,
  p_org_id int
)
RETURNS TABLE(
  id int,
  value text
) AS
$BODY$
  DECLARE
    user_form_id int;
    user_contact_id int;
    user_group_id int;
    user_location_id int;

    user_data json;
    contact_data json;
    group_data json;
    location_data json;
    policy_data json;

    eval_id int;
    eval_value text;

    map_data text;
    map_table text;
    map_column text;

    row_max int;
    row_min int := 1;
  BEGIN
    DROP TABLE IF EXISTS FGDU_eval CASCADE;
    CREATE TEMP TABLE FGDU_eval(id int, value text);

    SELECT json_agg(data)::json ->> 0
    INTO user_data
    FROM (
      SELECT
        u.username,
        u.password,
        u.passcode,
        u.contact_id,
        u.group_id,
        u.form_id,
        ul.location_id
      FROM sec.user u
      INNER JOIN sec.user_location ul ON ul.user_id = u.id
      LEFT JOIN org.location l ON l.id = ul.location_id
      WHERE u.id = p_filter_id
    ) data;

    --SET
    SELECT user_data ->> 'contact_id' INTO user_contact_id;
    SELECT user_data ->> 'group_id' INTO user_group_id;
    SELECT user_data ->> 'form_id' INTO user_form_id;
    SELECT user_data ->> 'location_id' INTO user_location_id;

    SELECT json_agg(data)::json ->> 0
    INTO contact_data
    FROM (
      SELECT *
      FROM org.contact c
      WHERE c.id = user_contact_id
    ) data;

    SELECT json_agg(data)::json ->> 0
    INTO group_data
    FROM (
      SELECT *
      FROM sec.group g
      WHERE g.id = user_group_id
    ) data;

    SELECT json_agg(data)::json ->> 0
    INTO location_data
    FROM (
      SELECT *
      FROM sec.user_location ul
      WHERE ul.location_id = user_location_id
    ) data;

    --REPLACE
    IF user_form_id IS NULL THEN
      user_form_id := p_form_id;
    END IF;

    DROP TABLE IF EXISTS FGDU_form_field CASCADE;
    CREATE TEMP TABLE FGDU_form_field AS
    SELECT
      row_number() over () as row_num, *
    FROM (
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_get_field(user_form_id, p_login_id, p_org_id)
      UNION
      SELECT
        field_id,
        field_map,
        field_lookup
      FROM org.fn_get_field_component(user_form_id, p_login_id, p_org_id)
    ) ff;

    SELECT max(ff.row_num)
    INTO row_max
    FROM FGDU_form_field ff;

    WHILE row_max >= row_min
    LOOP

      SELECT field_id, field_map
      INTO eval_id, map_data
      FROM FGDU_form_field ff
      WHERE ff.row_num = row_min;

      map_table := split_part(map_data, '.', 2);
      map_column := split_part(map_data, '.', 3);

      CASE map_table
        WHEN 'user' THEN
          SELECT user_data ->> map_column INTO eval_value;
        WHEN 'contact' THEN
          SELECT contact_data ->> map_column INTO eval_value;
        WHEN 'user_location' THEN
          SELECT location_data ->> map_column INTO eval_value;
        WHEN 'group' THEN
          SELECT group_data ->> map_column INTO eval_value;
        ELSE
          eval_value := null;
      END CASE;

      INSERT INTO FGDU_eval(id, value)
      VALUES (eval_id, eval_value);

      row_min := row_min + 1;
    END LOOP;

    --RAISE NOTICE 'USER DATA %', user_data;

    RETURN QUERY
    SELECT *
    FROM FGDU_eval;

  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION FN_GET_EVAL
CREATE OR REPLACE FUNCTION org.fn_get_eval(
  p_form_data json
)
RETURNS TABLE(
  id int,
  value text,
  map text,
  lookup text
) AS
$BODY$
  DECLARE
    row_min int := 1;
    row_max int;
  BEGIN
    --TEMP eval
    DROP TABLE IF EXISTS FGE_eval CASCADE;
    CREATE TEMP TABLE FGE_eval AS
    SELECT r.key id, r.value, r.map, r.lookup
    FROM json_to_recordset(p_form_data)
    AS r ("key" int, "value" text, "map" text, "lookup" text);

    --UPDATE map and lookup
    UPDATE FGE_eval e
    SET map = f.map,
        lookup = f.lookup
    FROM org.field f
    WHERE e.id = f.id;

    --LOOKUP territory
    DROP TABLE IF EXISTS FGE_lookup_territory CASCADE;
    CREATE TEMP TABLE FGE_lookup_territory AS
    SELECT 
      lt.row_num, 
      id, 
      value, 
      lt.map, 
      lookup, 
      lt.country_code, 
      lt.state_code
    FROM (
      WITH e as (
        SELECT 
          e.id, 
          e.value, 
          e.map, 
          e.lookup, 
          row_number() OVER (PARTITION BY e.map) AS row_group
        FROM FGE_eval e
        WHERE e.lookup IS NOT NULL AND split_part(e.lookup, '.', 2) = 'territory'
      ), e1 as (
        SELECT * FROM e WHERE row_group = 1
      ), e2 as (
        SELECT * FROM e WHERE row_group = 2
      )
      SELECT 
        row_number() over() row_num, 
        e1.map, 
        e1.value country_code, 
        e2.value state_code
      FROM e1
      LEFT JOIN e2 on e2.map = e1.map
    ) lt;

    --LOOP
    SELECT max(lt.row_num)
    INTO row_max
    FROM FGE_lookup_territory lt;

    WHILE row_max >= row_min
    LOOP
        
      UPDATE FGE_lookup_territory lt
      SET value = (
        SELECT t.id
        FROM dbo.territory t
        WHERE t.country_code = lt.country_code
        AND t.state_code = lt.state_code
      )::varchar
      WHERE lt.row_num = row_min;

      row_min := row_min + 1;
    END LOOP;

    RETURN QUERY

    SELECT lt.id, lt.value, lt.map, lt.lookup
    FROM FGE_lookup_territory lt
    UNION
    SELECT e.id, e.value, e.map, e.lookup
    FROM FGE_eval e
    WHERE e.lookup IS NULL OR split_part(e.lookup, '.', 2) <> 'territory';

  END;
$BODY$
LANGUAGE plpgsql;

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS org.fn_get_field;
DROP FUNCTION IF EXISTS org.fn_get_field_component;
DROP FUNCTION IF EXISTS org.fn_get_data_user;
DROP FUNCTION IF EXISTS org.fn_get_eval;
*/
