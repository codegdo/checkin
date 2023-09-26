DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[
    'language',
    'territory'
  ]::TEXT[];
  table_name TEXT;
BEGIN
  -- Functions
  CALL pr_drop_functions(function_names);

  -- Procedures
  CALL pr_drop_procedures(procedure_names);

  -- Tables
  CALL pr_drop_tables(table_names);
END $$;
