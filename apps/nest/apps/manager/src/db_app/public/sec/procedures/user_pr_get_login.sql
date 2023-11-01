CREATE OR REPLACE PROCEDURE user_pr_get_login(
  IN userId TEXT,
  OUT result JSON
)
AS $$
DECLARE
  user_data JSON;
  model_data JSON;
BEGIN
  -- Get user data if exist

  --IF user_data IS NULL THEN
    --RAISE EXCEPTION 'User not found';
  --ELSE

    SELECT json_agg(md)::JSON
    INTO model_data
    FROM (
      SELECT
        module,
        module_group AS "moduleGroup",
        view,
        view_group AS "viewGroup",
        object,
        object_slug AS "objectSlug"
      FROM module_fn_get_module_view_object('system')
    ) AS md;

    -- Combine user_data and model_data into the result JSON
    result := jsonb_build_object('user', user_data, 'model', model_data);
  --END IF;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE user_pr_get_login(text, out json) FROM public;

  -- Check if 'api_user' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_user') THEN
    -- If 'api_user' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE user_pr_get_login(text, out json) TO api_user;
  ELSE
    -- If 'api_user' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_user'' does not exist.';
  END IF;
END $$;




CREATE PROCEDURE main_sec.pr_user_login(
  p_user_id varchar,
  OUT data json
)
AS $$
DECLARE
  user_data json;
BEGIN
  SELECT json_agg(d)::json ->> 0 
  INTO data
  FROM (
    SELECT *
    FROM main_sec.fn_get_user_access(p_user_id)
  ) d;
END;
$$ LANGUAGE plpgsql;


CALL main_sec.pr_user_login('2', null);

