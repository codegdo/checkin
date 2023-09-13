-- Create a table to store migration scripts
CREATE TABLE IF NOT EXISTS main_sys.migration_script (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    migration_rollback_id INT,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    comment TEXT,

    database VARCHAR(50) NOT NULL,
    schema VARCHAR(50) NOT NULL,
    object_type VARCHAR(50) NOT NULL CHECK (object_type IN ('table', 'function', 'trigger', 'procedure', 'synonym', 'view', 'rollback')),

    script_type VARCHAR(10) NOT NULL DEFAULT 'sql' CHECK (script_type IN ('sql')),
    script_path VARCHAR(255) NOT NULL,
    script_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    FOREIGN KEY (migration_id) REFERENCES main_sys.migration (id) ON DELETE CASCADE,
    FOREIGN KEY (migration_rollback_id) REFERENCES main_sys.migration_rollback (id) ON DELETE SET NULL
);

INSERT INTO main_sys.migration_script (name, description, database, schema, object_type, script_type, script_path, script_order, migration_id, migration_rollback_id) VALUES
('fn_camel_case_split','Add public function fn_camel_case_split','db_checkin','public','function','sql','scripts/public/function/fn_camel_case_split.sql',0,1,null),
('fn_generate_random_string','Add public function fn_generate_random_string','db_checkin','public','function','sql','scripts/public/function/fn_generate_random_string.sql',1,1,null),
('fn_split_lookup_string_to_json','Add public function fn_split_lookup_string_to_json','db_checkin','public','function','sql','scripts/public/function/fn_split_lookup_string_to_json.sql',2,1,null),
('fn_updated_at','Add public function fn_updated_at','db_checkin','public','function','sql','scripts/public/function/fn_updated_at.sql',3,1,null),
('rb_initial_setup_public_functions','Rollback initial setup public functions','db_checkin','*','rollback','sql','rollbacks/00001_rb_initial_setup_public_functions.sql',0,null,1);
