-- Create a stored procedure to execute migrations
CREATE OR REPLACE FUNCTION execute_migrations(
  migration_id INT,
  migration_script TEXT
) RETURNS VOID AS $$
DECLARE
    last_migration RECORD;
    next_migration RECORD;
    next_execution_order INT;
BEGIN
    -- Find the last executed migration
    SELECT * INTO last_migration FROM main_sys.migration
    WHERE is_executed = TRUE
    ORDER BY execution_order DESC
    LIMIT 1;

    -- If no migrations have been executed yet, find the first pending migration
    IF last_migration IS NULL THEN
        SELECT * INTO next_migration FROM main_sys.migration
        WHERE is_executed = FALSE
        ORDER BY execution_order ASC
        LIMIT 1;
    ELSE
        -- Find the next migration in order
        next_execution_order := last_migration.execution_order + 1;

        SELECT * INTO next_migration FROM main_sys.migration
        WHERE execution_order = next_execution_order
        AND is_executed = FALSE;
    END IF;

    -- Check for skipped migrations
    IF next_migration IS NULL THEN
        -- Handle the case where a migration has been skipped
        RAISE EXCEPTION 'Skipped migration detected: Expected migration order %', next_execution_order;
    ELSE
      -- Execute migration logic here
      -- Replace the following line with your migration logic

      -- Find the migration by ID
      UPDATE main_sys.migration
      SET status = 'InProgress'
      WHERE id = migration_id;

      -- Execute the custom SQL script
      EXECUTE migration_script;

      -- Mark the migration as executed
      UPDATE main_sys.migration
      SET is_executed = TRUE,
          status = 'Completed',
          started_at = NOW(),
          completed_at = NOW()
      WHERE id = next_migration.id;
    END IF;

END;
$$ LANGUAGE plpgsql;
