-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS migration_script (
  id SERIAL PRIMARY KEY,
  migration_id INT,
  migration_rollback_id INT,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  comment TEXT,

  database_name VARCHAR(50) NOT NULL,
  schema_name VARCHAR(50) NOT NULL,
  object_type VARCHAR(50) NOT NULL CHECK (object_type IN ('table', 'function', 'trigger', 'procedure', 'synonym', 'view')),

  script_type VARCHAR(10) NOT NULL DEFAULT 'running' CHECK (script_type IN ('running', 'rollback')),
  script_path VARCHAR(255) NOT NULL,
  script_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  FOREIGN KEY (migration_id) REFERENCES migration (id) ON DELETE CASCADE,
  FOREIGN KEY (migration_rollback_id) REFERENCES migration_rollback (id) ON DELETE SET NULL
);

DO $$
DECLARE
  common_tables_and_functions INT;
  rollback_common_tables_and_functions INT;
BEGIN
  -- Find the ID of the 'Common Tables and Functions' migration
  SELECT id INTO common_tables_and_functions FROM migration WHERE name = 'Common Tables and Functions';
  -- Find the ID of the 'Rollback Database Common Tables And Functions' migration_rollback
  SELECT id INTO rollback_common_tables_and_functions FROM migration_rollback mr WHERE mr.id = common_tables_and_functions;

  -- Check if the 'migration_script' table has no records
  IF NOT EXISTS (SELECT 1 FROM migration_script) THEN
    -- Insert data into the 'migration_script' table
    INSERT INTO migration_script (migration_id, migration_rollback_id, name, description, database_name, schema_name, object_type, script_type, script_path, script_order) VALUES
    (common_tables_and_functions,null,'language','Add common table language.','db_checkin','public','table','running','db_checkin/public/dbo/functions/language.sql',0),
    (common_tables_and_functions,null,'territory','Add common table territory.','db_checkin','public','table','running','db_checkin/public/dbo/functions/territory.sql',1),
    (null,rollback_common_tables_and_functions,'rb_common_tables_and_functions','Rollback common tables and functions.','db_checkin','public','function','rollback','db_checkin/rollback-scripts/00001_rb_common_tables_and_functions.sql',0);
  ELSE
    -- The 'migration_script' table has records
    RAISE NOTICE 'The migration table is not empty.';
  END IF;
  
END;
$$;
