DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'fn_get_migration_all',
    'fn_get_migration_by_category',
    'fn_get_migration_by_id',
    'fn_get_migration_next',
    'fn_get_migration_previous',
    'fn_get_migration_rollbacks_for_execution_next',
    'fn_get_migration_scripts_for_execution_next'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'pr_migration_get_scripts_by_id',
    'pr_migration_update_status',
    'pr_migration_update_complete'
  ]::TEXT[];
  procedure_name TEXT;

  table_names TEXT[] := ARRAY[
    'migration_metadata', 
    'migration_tag', 
    'migration_script', 
    'migration_rollback', 
    'migration_dependency', 
    'migration',
    'migration_category'
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
