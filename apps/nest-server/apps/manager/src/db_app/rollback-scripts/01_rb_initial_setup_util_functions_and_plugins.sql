DO $$
DECLARE
  function_names TEXT[] := ARRAY[
    'fn_camel_case_split',
    'fn_generate_random_string',
    'fn_lookup_value_split_to_json',
    'fn_lookup_value'
  ]::TEXT[];
  function_name TEXT;

BEGIN
  -- Functions
  CALL pr_drop_functions(function_names);

END $$;