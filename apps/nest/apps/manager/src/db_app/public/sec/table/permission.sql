CREATE TABLE IF NOT EXISTS permission (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  access_level_id INT,
  view_id INT,
  company_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),

  FOREIGN KEY (access_level_id) REFERENCES access_level(id) ON DELETE SET NULL,
  FOREIGN KEY (view_id) REFERENCES view(id) ON DELETE SET NULL
);


DO $$
BEGIN
  -- Check if the permission table has no records
  IF (SELECT COUNT(*) FROM permission) = 0 THEN
   -- Insert data into the 'permission' table
    INSERT INTO permission(name,access_level_id, view_id) VALUES

    ('getAllMetric','1',2),

    ('assignScriptsToMigration','2',151),
    ('getAllMigrations','1',151),
    ('getMigrationById','1',151),
    ('getScriptsForMigration','1',151),
    ('getRollbacksForMigration','1',151),
    ('createNewMigration','2',151),
    ('migrationRunById','2',151),
    ('migrationRollbackById','2',151),

    ('getAllMigrationCategories','1',151),
    ('getMigrationCategoryById','1',151),
    ('createNewMigrationCategory','2',151),

    ('getAllMigrationScripts','1',151),
    ('getMigrationScriptById','1',151),
    ('createNewMigrationScript','2',151);
    
  ELSE
    -- The permission table has records
    RAISE NOTICE 'The permission table is not empty.';
  END IF;
END;
$$;