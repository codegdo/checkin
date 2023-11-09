CREATE OR REPLACE PROCEDURE user_pr_get_login(
  IN userId TEXT,
  OUT result JSON
)
AS $$
DECLARE
  user_data JSON;
  model_data JSON;
  menu_sort_order JSON;
BEGIN
  -- Get user data if it exists

  -- Set the menu_sort_order JSON variable
  menu_sort_order := '{"modules": {}, "views": {}, "objects": {}, "actions": {} }';

  -- Get user data if it exists

  --IF user_data IS NULL THEN
    --RAISE EXCEPTION 'User not found';
  --ELSE
    SELECT json_agg(md)::JSON
    INTO model_data
    FROM (
      SELECT
        module,
        module_group AS "moduleGroup",
        COALESCE(menu_sort_order->'modules'->>module, module_sort_order::text) AS "moduleSortOrder",
        view,
        view_group AS "viewGroup",
        COALESCE(menu_sort_order->'views'->>view, view_sort_order::text) AS "viewSortOrder",
        object,
        object_slug AS "objectSlug",
        COALESCE(menu_sort_order->'objects'->>object, object_sort_order::text) AS "objectSortOrder",
        action
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

CALL user_pr_get_login('2', null);

