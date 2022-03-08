-- CREATE PROCEDURE ORG SET DEFAULT
CREATE OR REPLACE PROCEDURE sec.pr_org_set_default(
  p_org_id int,
  p_login_id int
) AS
$BODY$
  DECLARE
    business_type varchar;
    login_username varchar;
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
      
      --INSERT GROUP
      INSERT 
      INTO sec.group(name, group_type_id, org_id, created_by)
      VALUES
      ('Manager', '2', p_org_id, login_username),
      ('Employee', '3', p_org_id, login_username);

    END IF;

    COMMIT;
  END;
$BODY$
LANGUAGE plpgsql;

--CALL sec.pr_org_set_default(null);
