DO $$
DECLARE
  function_names TEXT[] := ARRAY[
    'fn_get_schema_by_name'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'pr_create_schemas',
    'pr_drop_functions',
    'pr_drop_procedures',
    'pr_drop_schemas',
    'pr_drop_tables'
  ]::TEXT[];
  procedure_name TEXT;

BEGIN
  -- Functions
  CALL pr_required_drop_functions(function_names);

  -- Procedures
  CALL pr_required_drop_procedures(procedure_names);

END $$;