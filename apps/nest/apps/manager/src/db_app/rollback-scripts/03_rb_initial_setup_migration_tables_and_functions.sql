DO $$ 
DECLARE
  function_names TEXT[] := ARRAY[
    'migration_fn_get_all_migrations',
    'migration_fn_get_migration_by_id',
    'migration_fn_get_migration_rollback_id',
    'migration_fn_get_migrations_by_category',
    'migration_fn_get_next_migration',
    'migration_fn_get_previous_migration',
    'migration_fn_get_rollbacks_for_migration',
    'migration_fn_get_scripts_for_migration'
  ]::TEXT[];
  function_name TEXT;

  procedure_names TEXT[] := ARRAY[
    'migration_pr_get_all_migrations',
    'migration_pr_get_rollbacks_for_migration',
    'migration_pr_get_scripts_for_migration',
    'migration_pr_update_migration_completed',
    'migration_pr_update_migration_status'
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
  -- Procedures
  CALL system_pr_drop_procedures(procedure_names);

  -- Functions
  CALL system_pr_drop_functions(function_names);

  -- Types

  -- Tables
  CALL system_pr_drop_tables(table_names);
END $$;
