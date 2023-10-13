DO $$
DECLARE
  type_names TEXT[] := ARRAY[
    'type_user_role_info'
  ]::TEXT[];
  type_name TEXT;

  function_names TEXT[] := ARRAY[
    'fn_get_all_privileges',
    'fn_get_camel_case_split',
    'fn_get_generate_random_string',
    'fn_get_granted_privileges_by_user',
    'fn_get_lookup_value_split_to_json',
    'fn_get_lookup_value',
    'fn_get_lookup_value',
    'fn_get_user_role_info'
  ]::TEXT[];
  function_name TEXT;

BEGIN
  -- Types
  CALL pr_drop_types(type_names);

  -- Functions
  CALL pr_drop_functions(function_names);

END $$;