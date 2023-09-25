DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    '_sys.fn_get_config_by_key',
    '_sys.fn_is_config_key_boolean'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[
    '_sys.config'
  ]::TEXT[];
  table_name TEXT;
BEGIN
  -- Functions
  PERFORM _fn_drop_functions(function_names);

  -- Procedures
  PERFORM _fn_drop_procedures(procedure_names);

  -- Tables
  PERFORM _fn_drop_tables(table_names);
END $$;
