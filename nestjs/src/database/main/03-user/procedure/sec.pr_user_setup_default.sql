-- CREATE PROCEDURE USER SETUP DEFAULT
CREATE OR REPLACE PROCEDURE sec.pr_user_setup_default () AS
$BODY$
  DECLARE
  BEGIN
    COMMIT;
  END;
$BODY$
LANGUAGE plpgsql;

--CALL sec.pr_user_setup_default(null);