DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    '_sys.fn_get_migration_all',
    '_sys.fn_get_migration_by_category',
    '_sys.fn_get_migration_by_id',
    '_sys.fn_get_migration_next',
    '_sys.fn_get_migration_previous',
    '_sys.fn_get_migration_rollbacks_for_execution_next',
    '_sys.fn_get_migration_scripts_for_execution_next'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    '_sys.pr_migration_get_scripts',
    '_sys.pr_migration_update_status',
    '_sys.pr_migration_update_complete'
  ]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[
    '_sys.migration_metadata', 
    '_sys.migration_tag', 
    '_sys.migration_script', 
    '_sys.migration_rollback', 
    '_sys.migration_dependency', 
    '_sys.migration',
    '_sys.migration_category'
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
