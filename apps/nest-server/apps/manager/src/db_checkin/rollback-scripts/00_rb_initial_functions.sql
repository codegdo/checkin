DO $$
DECLARE
  function_names TEXT[] := ARRAY[
    '_fn_create_schemas',
    --'_fn_drop_functions',
    '_fn_drop_procedures',
    '_fn_drop_schemas',
    '_fn_drop_tables',
    --'._fn_execute_script'
  ]::TEXT[];
  function_name TEXT;

BEGIN
  -- Functions
  PERFORM _fn_drop_functions(function_names);

END $$;