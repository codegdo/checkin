DO $$
DECLARE
  type_names TEXT[] := ARRAY[
    'type_user_role_info'
  ]::TEXT[];
  type_name TEXT;

  function_names TEXT[] := ARRAY[
    'util_fn_get_all_privileges',
    'util_fn_get_camel_case_split',
    'util_fn_get_function_by_name',
    'util_fn_get_generate_random_string',
    'util_fn_get_granted_privileges_by_user',
    'util_fn_get_lookup_value_split_to_json',
    'util_fn_get_lookup_value',
    'util_fn_get_procedure_by_name',
    'util_fn_get_schema_by_name',
    'util_fn_get_table_by_name',
    'util_fn_get_trigger_by_name',
    'util_fn_get_user_role_info'
  ]::TEXT[];
  function_name TEXT;

BEGIN

  -- Functions
  CALL system_pr_drop_functions(function_names);

  -- Types
  CALL system_pr_drop_types(type_names);

END $$;