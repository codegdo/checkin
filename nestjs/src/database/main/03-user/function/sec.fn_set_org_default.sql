-- CREATE FUNCTION SET ORG DEFAULT
CREATE OR REPLACE FUNCTION sec.fn_set_org_default(
  p_org_id int,
  p_login_id int
)
RETURNS void AS
$BODY$
  DECLARE
    business_type varchar;
    login_username varchar;

    _groups json;
  BEGIN
    --SET business_type
    SELECT bt.category
    INTO business_type
    FROM sec.organization o
    LEFT JOIN dbo.business_type bt ON o.business_type_id = bt.id
    WHERE o.id = p_org_id;

    --SET username
    SELECT username
    INTO login_username
    FROM sec.user
    WHERE id = p_login_id;

    IF business_type = 'Service' THEN

      WITH g AS (
        INSERT
        INTO sec.group(name, group_type_id, org_id, created_by)
        VALUES
        ('Manager', '2', p_org_id, login_username),
        ('Employee', '3', p_org_id, login_username)
        RETURNING id, group_type_id, org_id
      ), p AS (
        INSERT
        INTO sec.policy(name, version_id, group_type_id, org_id, created_by)
        VALUES
        ('Manager Access', '1', '2', p_org_id, login_username),
        ('Employee Access', '1', '3', p_org_id, login_username)
        RETURNING id, group_type_id, org_id
      ), gp AS (
        INSERT
        INTO sec.group_policy(group_id, policy_id)
        VALUES
        (
          (SELECT id FROM g  WHERE group_type_id = 2 AND org_id = p_org_id),
          (SELECT id FROM p WHERE group_type_id = 2 AND org_id = p_org_id)
        ),
        (
          (SELECT id FROM g WHERE group_type_id = 3 AND org_id = p_org_id),
          (SELECT id FROM p WHERE group_type_id = 3 AND org_id = p_org_id)
        )
      )
      SELECT json_agg(g.id)::json
      INTO _groups
      FROM g WHERE org_id = p_org_id;

    END IF;

    RAISE NOTICE 'Groups ids has inserted %', _groups;
    --RETURN QUERY
    --SELECT _groups;
  END;
$BODY$
LANGUAGE plpgsql;

--SELECT sec.fn_set_org_default(7, 4);
