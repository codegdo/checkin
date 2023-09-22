DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'fn_camel_case_split',
    'fn_generate_random_string',
    'fn_split_lookup_string_to_json',
    'fn_updated_at'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[]::TEXT[];
  table_name TEXT;
BEGIN
  -- Functions
  PERFORM _fn_drop_functions(function_names);

  -- Procedures
  PERFORM _fn_drop_procedures(procedure_names);

  -- Tables
  PERFORM _fn_drop_tables(table_names);
END $$;
