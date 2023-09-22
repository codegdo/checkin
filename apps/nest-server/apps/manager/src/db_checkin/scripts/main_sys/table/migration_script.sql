-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS main_sys.migration_script (
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
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id) ON DELETE CASCADE,
    FOREIGN KEY (migration_rollback_id) REFERENCES main_sys.migration_rollback (id) ON DELETE SET NULL
);

DO $$
DECLARE
  setup_public_functions_id INT;
  rollback_setup_public_functions_id INT;
BEGIN
  -- Find the ID of the 'Setup Public Functions' migration
  SELECT id INTO setup_public_functions_id
  FROM main_sys.migration
  WHERE name = 'Setup Public Functions';

  -- Check if the migration with the name 'Setup Public Functions' exists
  IF setup_public_functions_id IS NOT NULL THEN

    -- Find the ID of the 'Rollback Setup Public Functions' migration
    SELECT id INTO rollback_setup_public_functions_id
    FROM main_sys.migration_rollback mr
    WHERE mr.id = setup_public_functions_id;

    -- Insert rolback 'Setup Public Functions'
    INSERT INTO main_sys.migration_script (migration_id, migration_rollback_id, name, description, database_name, schema_name, object_type, script_type, script_path, script_order) VALUES
    (setup_public_functions_id,null,'fn_camel_case_split','Add public function fn_camel_case_split','db_checkin','public','function','running','db_checkin/scripts/public/function/fn_camel_case_split.sql',0),
    (setup_public_functions_id,null,'fn_generate_random_string','Add public function fn_generate_random_string','db_checkin','public','function','running','db_checkin/scripts/public/function/fn_generate_random_string.sql',1),
    (setup_public_functions_id,null,'fn_split_lookup_string_to_json','Add public function fn_split_lookup_string_to_json','db_checkin','public','function','running','db_checkin/scripts/public/function/fn_split_lookup_string_to_json.sql',2),
    (setup_public_functions_id,null,'fn_updated_at','Add public function fn_updated_at','db_checkin','public','trigger','running','db_checkin/scripts/public/trigger/fn_updated_at.sql',3),
    (null,rollback_setup_public_functions_id,'rb_database_initialization_public_functions','Rollback database initializatio setup public functions','db_checkin','*','function','rollback','db_checkin/rollback-scripts/00001_rb_database_initialization_public_functions.sql',0);

  ELSE
    -- Handle the case where the migration does not exist
    RAISE NOTICE 'Migration with name ''Setup Public Functions'' not found.';
  END IF;
END;
$$;
