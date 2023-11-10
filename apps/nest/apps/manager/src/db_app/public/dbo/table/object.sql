CREATE TABLE IF NOT EXISTS object (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(255),

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  is_extendable BOOLEAN DEFAULT FALSE,
  is_editable BOOLEAN DEFAULT FALSE,
  is_auditable BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM object) = 0 THEN
    
    INSERT INTO object(id, name, slug, is_internal, is_external, is_extendable, is_editable, is_auditable, is_active) VALUES
    (1,'migration','migrations','0','0','0','0','0','1'),
    (2,'migration_category','migration-categories','0','0','0','0','0','1'),
    (3,'migration_script','migration-scripts','0','0','0','0','0','1'),
    (4,'migration_rolback','migration-rolbacks','0','0','0','0','0','1'),

    (5,'account','accounts','1','1','0','0','0','1'),
    (6,'company','companies','1','1','0','0','0','1'),
    (7,'user','users','1','1','0','0','0','1'),
    (8,'group','groups','1','1','0','0','0','1'),
    (9,'role','roles','1','1','0','0','0','1'),
    (10,'policy','policies','1','1','0','0','0','1');

  ELSE
    RAISE NOTICE 'The object table is not empty.';
  END IF;
END;
$$;