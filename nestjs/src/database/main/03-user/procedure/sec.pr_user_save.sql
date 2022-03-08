-- CREATE PROCEDURE USER_SAVE
CREATE OR REPLACE PROCEDURE sec.pr_user_save(
  p_user_id int,
  p_login_id int,
  p_form_data json,
  OUT data jsonb
)
AS
$BODY$
  DECLARE
    login_username varchar;
  BEGIN

    
    COMMIT;
  END
$BODY$
LANGUAGE plpgsql;

