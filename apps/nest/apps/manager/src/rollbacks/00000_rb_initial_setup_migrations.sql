DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'sys.fn_get_migration_all',
    'sys.fn_get_migration_by_category',
    'sys.fn_get_migration_by_id',
    'sys.fn_get_migration_next',
    'sys.fn_get_migration_previous',
    'sys.fn_get_migration_rollbacks_for_execution_next',
    'sys.fn_get_migration_scripts_for_execution_next'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'sys.pr_migration_get_scripts',
    'sys.pr_migration_update_status',
    'sys.pr_migration_update_complete'
  ]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[
    'sys.migration_metadata', 
    'sys.migration_tag', 
    'sys.migration_script', 
    'sys.migration_rollback', 
    'sys.migration_dependency', 
    'sys.migration',
    'sys.migration_category'
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
