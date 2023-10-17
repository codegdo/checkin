export const migrationTablesAndFunctions = {
  runningScripts: [
    // TABLES
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_category',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration_category.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_rollback',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration_rollback.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_script',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration_script.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_dependency',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration_dependency.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_tag',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration_tag.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_metadata',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/migration_metadata.sql',
    },
    // FUNCTIONS
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_all_migrations',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/function/migration_fn_get_all_migrations.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_migration_by_id',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/function/migration_fn_get_migration_by_id.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_migration_rollback_id',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/function/migration_fn_get_migration_rollback_id.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_migrations_by_category',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/function/migration_fn_get_migrations_by_category.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_next_migration',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/function/migration_fn_get_next_migration.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_previous_migration',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/function/migration_fn_get_previous_migration.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_scripts_for_migration',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/function/migration_fn_get_scripts_for_migration.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_fn_get_rollbacks_for_migration',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/function/migration_fn_get_rollbacks_for_migration.sql',
    },
    // PROCEDURES
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_pr_get_all_migrations',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/procedure/migration_pr_get_all_migrations.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_pr_get_migration_by_id',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/procedure/migration_pr_get_migration_by_id.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_pr_get_rollbacks_for_migration',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/procedure/migration_pr_get_rollbacks_for_migration.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_pr_get_scripts_for_migration',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/procedure/migration_pr_get_scripts_for_migration.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_pr_update_migration_completed',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/procedure/migration_pr_update_migration_completed.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'migration_pr_update_migration_status',
      scriptType: 'running',
      scriptPath:
        'db_app/public/sys/procedure/migration_pr_update_migration_status.sql',
    },
  ],
  rollbackScripts: [
    {
      category: 'Initial Setup',
      migration: 'Migration Tables And Functions',
      scriptName: 'rb_migration_tables_and_funtions',
      scriptType: 'rollback',
      scriptPath:
        'db_app/rollback-scripts/initial_setup/rb_migration_tables_and_functions.sql',
    },
  ],
};
