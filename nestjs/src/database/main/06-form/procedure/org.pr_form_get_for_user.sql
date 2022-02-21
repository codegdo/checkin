CREATE PROCEDURE IF NOT EXISTS org.pr_form_get_for_user(
  p_form_id varchar,
  OUT data json
)
AS
$BODY$
  DECLARE

  BEGIN

  IF SELECT p_form_id ~ '^\d+$' THEN

  END IF;

  END;
$BODY$
LANGUAGE plpgsql;