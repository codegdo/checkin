-- CREATE FUNCTION USER_GET_FOR_ORG
CREATE OR REPLACE FUNCTION sec.fn_get_user_for_org(
  p_login_id int
)
RETURNS TABLE (
  id,
  username,
  group
)
AS
$BODY$
  DECLARE
    user_org_id int;
  BEGIN
    --SET 
    SELECT u.org_id
    INTO user_org_id
    FROM sec.user u
    WHERE u.id = p_login_id;


    RETURN QUERY

    SELECT
      u.id,
      u.username,
      g.name
    FROM sec.user u
    LEFT JOIN sec.group g ON g.id = u.group_id
    LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
    INNER JOIN sec.user_location ul ON ul.user_id = u.id
    LEFT JOIN org.location l ON l.id = ul.location_id
    WHERE u.org_id = user_org_id
      AND u.id <> p_login_id
      --AND ul.location_id = 6 
      --AND gt.id = 3
      AND u.is_active = true;
  END;
$BODY$
LANGUAGE plpgsql;

