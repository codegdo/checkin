-- CREATE FUNCTION FN_USER_GET_DATA
CREATE OR REPLACE FUNCTION org.fn_user_get_data(p_user_id varchar)
RETURNS TABLE(
  id int,
  value text
)
AS
$BODY$
  DECLARE
    
  BEGIN
    DROP TABLE IF EXISTS tmp_eval CASCADE;
    CREATE  TEMP TABLE tmp_eval(id int, value text);

    RETURN QUERY
    SELECT  *
    FROM    tmp_eval;
    
  END;
$BODY$
LANGUAGE plpgsql;

SELECT * FROM org.fn_user_get_data('1');

DROP FUNCTION IF EXISTS org.fn_user_get_data;