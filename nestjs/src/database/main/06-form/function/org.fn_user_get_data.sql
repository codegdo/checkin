-- CREATE FUNCTION FN_USER_GET_DATA
CREATE OR REPLACE FUNCTION org.fn_user_get_data(p_user_id varchar)
RETURNS TABLE(
  id int,
  value text
)
AS
$BODY$
  DECLARE
    user_data json;
  BEGIN
    DROP TABLE IF EXISTS tmp_eval CASCADE;
    CREATE  TEMP TABLE tmp_eval(id int, value text);

    SELECT json_agg(u.*)::json ->> 0
    INTO user_data
    FROM (
      SELECT * 
      FROM sec.user 
      WHERE id = p_user_id;
    ) u;

    --SET
    SELECT user_data ->> 'formId' INTO user_form_id;


    

    RETURN QUERY
    SELECT  *
    FROM    tmp_eval;
    
  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_user_get_data('1');

DROP FUNCTION IF EXISTS org.fn_user_get_data;