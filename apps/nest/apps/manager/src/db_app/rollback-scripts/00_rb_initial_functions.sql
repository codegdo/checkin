DO $$
DECLARE
  function_names TEXT[] := ARRAY[
    'fn_get_function_by_name',
    'fn_get_procedure_by_name',
    'fn_get_schema_by_name',
    'fn_get_table_by_name',
    'fn_get_trigger_by_name'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'pr_create_schemas',
    'pr_drop_functions',
    'pr_drop_procedures',
    'pr_drop_schemas',
    'pr_drop_tables',
    'pr_drop_types'
  ]::TEXT[];
  procedure_name TEXT;

BEGIN
  -- Functions
  CALL pr_system_drop_functions(function_names);

  -- Procedures
  CALL pr_system_drop_procedures(procedure_names);

END $$;