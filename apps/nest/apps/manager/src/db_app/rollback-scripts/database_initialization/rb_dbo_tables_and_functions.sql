DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[]::TEXT[];
  procedure_name TEXT;

  type_names TEXT[] := ARRAY[]::TEXT[];
  type_name TEXT;

  table_names TEXT[] := ARRAY[
    'language', 
    'terrritory'
  ]::TEXT[];
  table_name TEXT;
BEGIN
  -- Procedures
  --CALL system_pr_drop_procedures(procedure_names);

  -- Functions
  --CALL system_pr_drop_functions(function_names);

  -- Types
  --CALL system_pr_drop_types(type_names);

  -- Tables
  CALL system_pr_drop_tables(table_names);
END $$;
