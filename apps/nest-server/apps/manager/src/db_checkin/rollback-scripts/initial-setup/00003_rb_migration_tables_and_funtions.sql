DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'main_sys.fn_get_migration_all',
    'main_sys.fn_get_migration_by_category',
    'main_sys.fn_get_migration_by_id',
    'main_sys.fn_get_migration_next',
    'main_sys.fn_get_migration_previous',
    'main_sys.fn_get_migration_rollbacks_for_execution_next',
    'main_sys.fn_get_migration_scripts_for_execution_next'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'main_sys.pr_migration_get_scripts',
    'main_sys.pr_migration_update_status',
    'main_sys.pr_migration_update_complete'
  ]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[
    'main_sys.migration_metadata', 
    'main_sys.migration_tag', 
    'main_sys.migration_script', 
    'main_sys.migration_rollback', 
    'main_sys.migration_dependency', 
    'main_sys.migration',
    'main_sys.migration_category'
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
