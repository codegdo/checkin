-- CREATE FUNCTION POLICY_GET_BY_GROUP_ID
CREATE OR REPLACE FUNCTION sec.fn_policy_get_by_group_id(p_group_id int)
RETURNS TABLE (
  "statement" jsonb,
  "version" varchar
)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        p.statement,
        pv.name
      FROM sec.group g
      INNER JOIN sec.group_policy gp ON g.id = gp.group_id
      LEFT JOIN sec.policy p ON gp.policy_id = p.id
      LEFT JOIN dbo.policy_version pv ON p.version_id = pv.id
      WHERE g.id = p_group_id;
  END;
$BODY$
LANGUAGE plpgsql;