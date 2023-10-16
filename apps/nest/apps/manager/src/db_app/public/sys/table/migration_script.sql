-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS migration_script (
  id SERIAL PRIMARY KEY,
  migration_id INT,
  migration_rollback_id INT,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  comment TEXT,

  script_type VARCHAR(10) NOT NULL DEFAULT 'running' CHECK (script_type IN ('running', 'rollback')),
  script_path VARCHAR(255) NOT NULL,
  script_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  FOREIGN KEY (migration_id) REFERENCES migration (id) ON DELETE CASCADE,
  FOREIGN KEY (migration_rollback_id) REFERENCES migration_rollback (id) ON DELETE SET NULL
);

DO $$
DECLARE
  dbo_tables_and_functions INT;
  rollback_dbo_tables_and_functions INT;
BEGIN
  -- Find the ID of the 'Common Tables and Functions' migration
  SELECT id INTO dbo_tables_and_functions FROM migration WHERE name = 'Dbo Tables and Functions';
  -- Find the ID of the 'Rollback Database Dbo Tables And Functions' migration_rollback
  SELECT id INTO rollback_dbo_tables_and_functions FROM migration_rollback mr WHERE mr.id = dbo_tables_and_functions;

  -- Check if the 'migration_script' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration_script) THEN
    -- Insert data into the 'migration_script' table
    INSERT INTO migration_script (migration_id, migration_rollback_id, name, description, script_type, script_path, script_order) VALUES
    (dbo_tables_and_functions,null,'language','Add dbo table language.','running','db_app/public/dbo/table/language.sql',0),
    (dbo_tables_and_functions,null,'territory','Add dbo table territory.','running','db_app/public/dbo/table/territory.sql',1),
    (null,rollback_dbo_tables_and_functions,'rb_dbo_tables_and_functions','Rollback dbo tables and functions.','rollback','db_app/rollback-scripts/database_initialization/01_rb_dbo_tables_and_functions.sql',0);
  ELSE
    -- The 'migration_script' table has records
    RAISE NOTICE 'The migration table is not empty.';
  END IF;
  
END;
$$;
