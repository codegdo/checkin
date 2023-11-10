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
   
    INSERT INTO permission(name,access_level_id, view_id) VALUES

    ('assignScriptsToMigration',2,4),
    ('getAllMigrations',1,4),
    ('getMigrationById',1,4),
    ('getScriptsForMigration',1,4),
    ('getRollbacksForMigration',1,4),
    ('createNewMigration',2,4),
    ('migrationRunById',2,4),
    ('migrationRollbackById',2,4),

    ('getAllMigrationCategories',1,4),
    ('getMigrationCategoryById',1,4),
    ('createNewMigrationCategory',2,4),

    ('getAllMigrationScripts',1,4),
    ('getMigrationScriptById',1,4),
    ('createNewMigrationScript',2,4);
    
  ELSE
    -- The permission table has records
    RAISE NOTICE 'The permission table is not empty.';
  END IF;
END;
$$;