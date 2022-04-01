-- CREATE PROCEDURE USER_GET_ALL
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
  BEGIN

    SELECT json_agg(r)::json
    INTO users
    FROM (
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
      )
    ) r;

  END;
$BODY$
LANGUAGE plpgsql;

--CALL sec.pr_user_get_all(1, 1, null);