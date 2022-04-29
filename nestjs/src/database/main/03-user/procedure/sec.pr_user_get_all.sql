-- CREATE PROCEDURE USER_GET_ALL
CREATE OR REPLACE PROCEDURE sec.pr_user_get_all(
  p_login_type varchar,
  p_org_id int,

  p_username varchar,
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_phone_number varchar,
  p_location varchar,
  p_group varchar,
  p_type varchar,

  p_limit int,
  p_offset int,
  p_sort_column varchar,
  p_sort_direction varchar,

  OUT config json,
  OUT columns json,
  OUT users json
)
AS
$BODY$
  DECLARE
  BEGIN

  SELECT json_agg(r)::json ->> 0
  INTO config
  FROM (
    SELECT
    gv.with_paging "withPaging"
    FROM org.fn_get_gridview('setup_users', p_org_id) gv
  ) r;

  SELECT json_agg(r)::json
  INTO columns
  FROM (
    SELECT
    gv.id "id",
    gv.name "name",
    gv.label "label",
    gv.type "type",
    gv.data "data",
    gv.is_default "isDefault",
    gv.is_search "isSearch",
    gv.is_key "isKey"
    FROM
    org.fn_get_gridview_column('setup_users', p_org_id) gv
    WHERE gv.is_visible = true
  ) r;

  SELECT json_agg(r)::json
  INTO users
  FROM (
    SELECT
      u.id "id",
      u.username "username",
      u.first_name "firstName",
      u.last_name "lastName",
      u.email_address "emailAddress",
      u.phone_number "phoneNumber",
      string_agg(l.name, ', ') "location",
      u.group_level "level",
      u.group_name "group",
      u.group_type "type",
      u.is_active "isActive"
    FROM (SELECT * FROM sec.fn_get_user_for_org(p_org_id)) u
    LEFT JOIN sec.user_location ul ON ul.user_id = u.id
    LEFT JOIN org.location l ON l.id = ul.location_id
    WHERE
      CASE WHEN p_login_type = 'system' THEN true ELSE ul.location_id IS NOT NULL END
      AND (u.username LIKE '%' || p_username || '%' OR p_username IS NULL)
      AND (u.first_name LIKE '%' || p_first_name || '%' OR p_first_name IS NULL)
      AND (u.last_name LIKE '%' || p_last_name || '%' OR p_last_name IS NULL)
      AND (u.email_address LIKE '%' || p_email_address || '%' OR p_email_address IS NULL)
      AND (u.phone_number LIKE '%' || p_phone_number || '%' OR p_phone_number IS NULL)
      AND (l.name LIKE '%' || p_location || '%' OR p_location IS NULL)
      AND (u.group_name LIKE '%' || p_group || '%' OR p_group IS NULL)
      AND (u.group_type LIKE '%' || p_type || '%' OR p_type IS NULL)
    GROUP BY u.id, u.username, u.first_name, u.last_name, u.email_address, u.phone_number, l.name, u.group_level, u.group_name, u.group_type, u.is_active
    ORDER BY
      CASE WHEN p_sort_column = '' AND p_sort_direction = '' THEN u.id END DESC,
      CASE WHEN p_sort_column = 'id' AND p_sort_direction = 'asc' THEN u.id END ASC,
      CASE WHEN p_sort_column = 'id' AND p_sort_direction = 'desc' THEN u.id END DESC,
      CASE WHEN p_sort_column = 'username' AND p_sort_direction = 'asc' THEN u.username END ASC,
      CASE WHEN p_sort_column = 'username' AND p_sort_direction = 'desc' THEN u.username END DESC,
      CASE WHEN p_sort_column = 'firstName' AND p_sort_direction = 'asc' THEN u.first_name END ASC,
      CASE WHEN p_sort_column = 'firstName' AND p_sort_direction = 'desc' THEN u.first_name END DESC,
      CASE WHEN p_sort_column = 'lastName' AND p_sort_direction = 'asc' THEN u.last_name END ASC,
      CASE WHEN p_sort_column = 'lastName' AND p_sort_direction = 'desc' THEN u.last_name END DESC,
      CASE WHEN p_sort_column = 'emailAddress' AND p_sort_direction = 'asc' THEN u.email_address END ASC,
      CASE WHEN p_sort_column = 'emailAddress' AND p_sort_direction = 'desc' THEN u.email_address END DESC,
      CASE WHEN p_sort_column = 'phoneNumber' AND p_sort_direction = 'asc' THEN u.phone_number END ASC,
      CASE WHEN p_sort_column = 'phoneNumber' AND p_sort_direction = 'desc' THEN u.phone_number END DESC,
      CASE WHEN p_sort_column = 'location' AND p_sort_direction = 'asc' THEN l.name END ASC,
      CASE WHEN p_sort_column = 'location' AND p_sort_direction = 'desc' THEN l.name END DESC,
      CASE WHEN p_sort_column = 'level' AND p_sort_direction = 'asc' THEN u.group_level END ASC,
      CASE WHEN p_sort_column = 'level' AND p_sort_direction = 'desc' THEN u.group_level END DESC,
      CASE WHEN p_sort_column = 'group' AND p_sort_direction = 'asc' THEN u.group_name END ASC,
      CASE WHEN p_sort_column = 'group' AND p_sort_direction = 'desc' THEN u.group_name END DESC,
      CASE WHEN p_sort_column = 'type' AND p_sort_direction = 'asc' THEN u.group_type END ASC,
      CASE WHEN p_sort_column = 'type' AND p_sort_direction = 'desc' THEN u.group_type END DESC,
      CASE WHEN p_sort_column = 'isActive' AND p_sort_direction = 'asc' THEN u.is_active END ASC,
      CASE WHEN p_sort_column = 'isActive' AND p_sort_direction = 'desc' THEN u.is_active END DESC
    LIMIT p_limit
    OFFSET p_offset
  ) r;

  END;
$BODY$
LANGUAGE plpgsql;

--CALL sec.pr_user_get_all('internal',1, null, null, null, null, null, null, null, null, null, null, null, null, null,null,null);



/*

CREATE OR REPLACE PROCEDURE sec.pr_user_get_all(
  p_login_type varchar,
  p_org_id int,
  p_location_id int,

  OUT columns json,
  OUT fields json,
  OUT users json
)
AS
$BODY$
  DECLARE
    header_columns varchar;
  BEGIN

  SELECT array_to_string(array_agg(format('"%s"',gv.name)), ',')
  INTO header_columns
  FROM org.fn_get_gridview('setup_users', p_org_id) gv
  WHERE gv.is_visible = true;

  DROP TABLE IF EXISTS PUGA_users CASCADE;
  CREATE TEMPORARY TABLE PUGA_users AS
  SELECT DISTINCT
    u.id "id",
    u.username "username",
    u.first_name "firstName",
    u.last_name "lastName",
    u.email_address "emailAddress",
    u.phone_number "phoneNumber",
    u.group_level "level",
    u.group_name "group",
    u.group_type "type",
    u.is_active "isActive"
  FROM (SELECT * FROM sec.fn_get_user_for_org(p_org_id)) u
  LEFT JOIN sec.user_location ul ON ul.user_id = u.id
  LEFT JOIN org.location l ON l.id = ul.location_id
  WHERE (
    CASE
      WHEN (p_login_type = 'system') THEN
        ul.location_id = p_location_id OR ul.location_id IS NULL
      ELSE
        ul.location_id = p_location_id
    END
  );

  IF(header_columns IS NOT NULL) THEN

    SELECT json_agg(r)::json
    INTO columns
    FROM (
        SELECT
        gv.id,
        gv.name,
        gv.label
        FROM
        org.fn_get_gridview('setup_users', p_org_id) gv
        WHERE gv.is_visible = true
    ) r;

    SELECT json_agg(r)::json
    INTO fields
    FROM (
        SELECT
        gv.id,
        gv.name,
        gv.label,
        gv.type,
        gv.data
        FROM
        org.fn_get_gridview('setup_users', p_org_id) gv
        WHERE gv.is_visible = true
    ) r;

    EXECUTE FORMAT(
      $ex$
        SELECT json_agg(r)::json
        FROM (
          SELECT %1$s FROM PUGA_users
        ) r
      $ex$, header_columns
    )
    INTO users;

  ELSE
    SELECT json_agg(r)::json
    INTO users
    FROM PUGA_users r;
  END IF;

  END;
$BODY$
LANGUAGE plpgsql;

*/