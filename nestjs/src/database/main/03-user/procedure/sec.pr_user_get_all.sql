-- CREATE PROCEDURE USER_GET_ALL
CREATE OR REPLACE PROCEDURE sec.pr_user_get_all(
  p_org_id int,
  p_location_id int,

  OUT data json
)
AS
$BODY$
  DECLARE
  BEGIN

    SELECT json_agg(r)::json
    INTO data
    FROM (
      SELECT
        u.id "id",
        u.username "username",
        u.first_name "firstName",
        u.last_name "lastName",
        u.email_address "emailAddress",
        u.phone_number "phoneNumber",
        u.group_level "groupLevel",
        u.group_name "role",
        u.group_type "groupType",
        u.is_active "isActive"
      FROM (SELECT * FROM sec.fn_get_user_for_org(p_org_id)) u
      INNER JOIN sec.user_location ul ON ul.user_id = u.id
      LEFT JOIN org.location l ON l.id = ul.location_id
      WHERE ul.location_id = p_location_id
    ) r;

  END;
$BODY$
LANGUAGE plpgsql;

--CALL sec.pr_user_get_all(1, 1, null);