-- CREATE PROCEDURE PR_FORM_GET
CREATE OR REPLACE PROCEDURE org.pr_form_get(
  p_form_id varchar,
  p_filter_id int,
  p_login_id int,
  p_org_id int,
  OUT data json
)
AS
$BODY$
  DECLARE
    form_id int;
    form_name varchar;
    form_type varchar;
    form_field jsonb;

    row_max int;
    row_min int := 1;
  BEGIN

    --GET
    SELECT f.id, f.name, ft.name
    INTO form_id, form_name, form_type
    FROM org.form f
    LEFT JOIN dbo.form_type ft ON f.form_type_id = ft.id
    WHERE (
      CASE
        WHEN (p_form_id ~ '^\d+$') THEN
          f.id = CAST(p_form_id as int)
        ELSE
          f.name = p_form_id
      END
    )
    AND f.org_id = p_org_id
    AND f.is_publish IS TRUE;

    -- DEFAULT
    IF form_id IS NULL THEN
      SELECT f.id, f.name, ft.name
      INTO form_id, form_name, form_type
      FROM org.form f
      LEFT JOIN dbo.form_type ft ON f.form_type_id = ft.id
      WHERE (
        CASE
          WHEN (p_form_id ~ '^\d+$') THEN
            f.id = CAST(p_form_id as int)
          ELSE
            f.name = p_form_id
        END
      )
      AND f.org_id IS NULL
      AND f.is_publish IS TRUE;
    END IF;

    IF form_id IS NOT NULL THEN
      --TEMP TABLE
      DROP TABLE IF EXISTS PFG_form_field CASCADE;
      CREATE TEMP TABLE PFG_form_field AS
      SELECT * FROM org.fn_get_field(form_id, p_login_id, p_org_id);

      DROP TABLE IF EXISTS PFG_form_component CASCADE;
      CREATE TEMP TABLE PFG_form_component AS
      SELECT * FROM org.fn_get_field_component(form_id, p_login_id, p_org_id);

      --WITH DATA
      IF p_filter_id > 0 THEN

        DROP TABLE IF EXISTS PFG_eval CASCADE;
        CREATE TEMP TABLE PFG_eval(id int, value text);

        IF form_type = 'User' THEN
          INSERT INTO PFG_eval(id, value)
          SELECT id, value
          FROM org.fn_get_data_user(form_id, p_filter_id, p_login_id, p_org_id);
        END IF;

        --SET FIELD VALUE
        SELECT max(ff.row_num)
        INTO row_max
        FROM PFG_form_field ff;

        WHILE row_max >= row_min
        LOOP
          UPDATE PFG_form_field ff
          SET field_value = (SELECT value FROM PFG_eval e WHERE e.id = ff.field_id)
          WHERE ff.row_num = row_min;

          row_min := row_min + 1;
        END LOOP;

        --SET COMPONENT FIELD VALUE
        row_min := 1;

        SELECT max(cf.row_num)
        INTO row_max
        FROM PFG_form_component cf;

        WHILE row_max >= row_min
        LOOP
          UPDATE PFG_form_component cf
          SET field_value = (SELECT value FROM PFG_eval e WHERE e.id = cf.field_id)
          WHERE cf.row_num = row_min;

          row_min := row_min + 1;
        END LOOP;
      END IF;

      --MAP COMPONENT FIELD TO PARENT

      --MAP FIELD TO FORM
      SELECT json_agg(field)::jsonb
      INTO form_field
      FROM (
        SELECT
          ff.field_id id,
          ff.field_name name,
          ff.field_title title,
          ff.field_description description,
          ff.field_type type,
          ff.field_role role,
          ff.field_data data,
          ff.field_value value,
          ff.field_lookup lookup,
          ff.field_map map,
          ff.field_position position,
          ff.field_parent_id "parentId",
          ff.field_is_required "isRequired",
          ff.field_has_dependent "hasDependent",
          ff.field_is_dependent "isDependent"
        FROM PFG_form_field ff
        ORDER BY ff.field_position
      ) field;

      SELECT json_agg(form)::json
      INTO data
      FROM (
        SELECT DISTINCT
        f.form_id id,
        f.form_name name,
        f.form_title title,
        f.form_data data,
        form_field fields
        FROM PFG_form_field f
      ) form;

    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

--DROP PROCEDURE IF EXISTS org.pr_form_get(varchar, int, int, int, json);
--CALL org.pr_form_get('auth_signup', 1, 1, 1, null);