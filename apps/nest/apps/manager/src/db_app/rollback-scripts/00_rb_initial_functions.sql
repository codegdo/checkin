DO $$
DECLARE
  function_names TEXT[] := ARRAY[
    'system_fn_create_schemas',
    'system_fn_drop_functions',
    'system_fn_drop_procedures',
    'system_fn_drop_schemas',
    'system_fn_drop_tables',
    'system_fn_drop_types',
    'system_fn_drop_views',
    'system_fn_execute_script'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'system_pr_create_schemas',
    'system_pr_drop_functions',
    'system_pr_drop_procedures',
    'system_pr_drop_schemas',
    'system_pr_drop_tables',
    'system_pr_drop_types'
  ]::TEXT[];
  procedure_name TEXT;

BEGIN
  -- Functions
  CALL _pg_drop_functions(function_names);

  -- Procedures
  CALL _pg_drop_procedures(procedure_names);

END $$;