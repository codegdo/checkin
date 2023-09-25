CREATE OR REPLACE FUNCTION sec.fn_get_user(input_user_id INT)
RETURNS TABLE (
  user_id INT,
  user_company_id INT
) AS $$
BEGIN

  RETURN QUERY
  SELECT
    u.id,
    u.company_id
  FROM sec.user u
  LEFT JOIN sec.group g ON u.group_id = g.id
  WHERE u.id = input_user_id
  AND u.is_active IS true;

END;
$$ LANGUAGE plpgsql;

select * from sec.fn_get_user('1')