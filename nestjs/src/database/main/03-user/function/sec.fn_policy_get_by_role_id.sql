-- CREATE FUNCTION POLICY_GET_BY_ROLE_ID
CREATE OR REPLACE FUNCTION sec.fn_policy_get_by_role_id(p_role_id int)
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
      FROM sec.role r
      INNER JOIN sec.role_policy rp ON r.id = rp.role_id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.policy_version pv ON p.version_id = pv.id
      WHERE r.id = p_role_id;
  END;
$BODY$
LANGUAGE plpgsql;